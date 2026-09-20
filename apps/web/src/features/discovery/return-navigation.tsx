"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ComponentProps } from "react";

type ReturnPosition = {
  href: string;
  y: number;
  selector: string;
  index: number;
  scrollers: ScrollPosition[];
};
type ScrollPosition = {
  depth: number;
  tag: string;
  className: string;
  left: number;
  top: number;
};
const returns = new Map<string, ReturnPosition>();
let pendingReturn: { token: string; destination: string } | null = null;
let restoreFrame = 0;
let observedPath: string | null = null;
type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

function rememberScrollers(target: HTMLElement | undefined): ScrollPosition[] {
  const positions: ScrollPosition[] = [];
  let owner = target?.parentElement;
  let depth = 1;
  while (
    owner &&
    owner !== document.body &&
    owner !== document.documentElement
  ) {
    const style = getComputedStyle(owner);
    if (
      (owner.scrollWidth > owner.clientWidth &&
        /auto|scroll/.test(style.overflowX)) ||
      (owner.scrollHeight > owner.clientHeight &&
        /auto|scroll/.test(style.overflowY))
    )
      positions.push({
        depth,
        tag: owner.tagName,
        className: owner.className,
        left: owner.scrollLeft,
        top: owner.scrollTop,
      });
    owner = owner.parentElement;
    depth += 1;
  }
  return positions;
}

function restoreScrollers(target: HTMLElement, positions: ScrollPosition[]) {
  for (const position of positions) {
    let owner: HTMLElement | null = target;
    for (let depth = 0; depth < position.depth; depth += 1)
      owner = owner?.parentElement ?? null;
    if (
      !owner ||
      owner.tagName !== position.tag ||
      owner.className !== position.className
    )
      continue;
    owner.scrollTo({
      left: position.left,
      top: position.top,
      behavior: "instant",
    });
    // Visiting an item can reorder a recent rail. Preserve that real history
    // and the old offset unless it would leave the return control wholly hidden.
    const control = target.getBoundingClientRect();
    const bounds = owner.getBoundingClientRect();
    const left = bounds.left + owner.clientLeft;
    const right = left + owner.clientWidth;
    const delta =
      control.right <= left
        ? control.left - left
        : control.left >= right
          ? control.right - right
          : 0;
    if (delta)
      owner.scrollTo({ left: owner.scrollLeft + delta, behavior: "instant" });
  }
}

function restoreSourceReturn(token: string) {
  cancelAnimationFrame(restoreFrame);
  const position = returns.get(token);
  if (!position) return;
  let attempts = 0;
  let previousHeight = -1;
  let settled = 0;
  const restore = () => {
    const origin = window.history.state?.shopSourceReturnOrigin;
    const matching =
      origin === token &&
      `${location.pathname}${location.search}${location.hash}` ===
        position.href;
    // A source entry can also own cart/filter history. Never restore a page
    // control behind one of those dialogs, even while streaming settles.
    if (matching && document.querySelector("dialog[open]")) return;
    const target = matching
      ? document.querySelectorAll<HTMLElement>(position.selector)[
          position.index
        ]
      : undefined;
    const height = document.documentElement.scrollHeight;
    settled = height === previousHeight ? settled + 1 : 0;
    previousHeight = height;
    if (
      target?.isConnected &&
      !target.closest('[data-shop-interactive="false"]') &&
      settled >= 2
    ) {
      restoreScrollers(target, position.scrollers);
      window.scrollTo({ top: position.y, behavior: "instant" });
      target.focus({ preventScroll: true });
      return;
    }
    if (++attempts < 180) restoreFrame = requestAnimationFrame(restore);
  };
  restoreFrame = requestAnimationFrame(restore);
}

/** Native Back can arrive before its streamed source has mounted. */
export function useSourceReturn(ready: boolean) {
  const pathname = usePathname();
  useEffect(() => {
    if (!ready) return;
    const restore = () => {
      const crossedRoute =
        observedPath !== null && observedPath !== location.pathname;
      observedPath = location.pathname;
      // Sheet entries inherit the origin token. Only a return from another
      // route can restore it; a same-route pop must retain the sheet's focus.
      if (!crossedRoute) return;
      const token = window.history.state?.shopSourceReturnOrigin;
      const position = returns.get(token);
      if (
        position?.href ===
        `${location.pathname}${location.search}${location.hash}`
      )
        restoreSourceReturn(token);
    };
    window.addEventListener("popstate", restore);
    restore();
    return () => window.removeEventListener("popstate", restore);
  }, [ready, pathname]);
}

export function rememberSourceReturn(
  destination: string,
  selector: string,
  index = 0,
) {
  observedPath = location.pathname;
  const token = crypto.randomUUID();
  returns.set(token, {
    href: `${location.pathname}${location.search}${location.hash}`,
    y: scrollY,
    selector,
    index,
    scrollers: rememberScrollers(
      document.querySelectorAll<HTMLElement>(selector)[index],
    ),
  });
  window.history.replaceState(
    { ...window.history.state, shopSourceReturnOrigin: token },
    "",
    location.href,
  );
  pendingReturn = {
    token,
    destination: new URL(destination, location.href).pathname,
  };
}

export function SourceLink({ href, onNavigate, ...props }: Props) {
  const element = useRef<HTMLAnchorElement>(null);
  const id = `${href}|${props.className ?? ""}|${props["aria-label"] ?? ""}`;
  return (
    <Link
      {...props}
      href={href}
      ref={element}
      data-source-return={id}
      onNavigate={(event) => {
        const selector = `[data-source-return="${CSS.escape(id)}"]`;
        rememberSourceReturn(
          href,
          selector,
          [...document.querySelectorAll(selector)].indexOf(element.current!),
        );
        onNavigate?.(event);
      }}
    />
  );
}

/** Close returns to the actual entry point; direct URLs keep their fallback. */
export function ContextualCloseLink({ href, onNavigate, ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pendingReturn?.destination !== pathname) return;
    // Bind the return to this actual destination entry. Forward restores the
    // token, whereas a later unrelated visit to the same route has no token.
    window.history.replaceState(
      { ...window.history.state, shopSourceReturnToken: pendingReturn.token },
      "",
      location.href,
    );
    pendingReturn = null;
  }, [pathname]);
  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        const position = returns.get(
          window.history.state?.shopSourceReturnToken,
        );
        if (!position) {
          onNavigate?.(event);
          return;
        }
        event.preventDefault();
        const token = window.history.state.shopSourceReturnToken;
        router.back();
        restoreSourceReturn(token);
      }}
    />
  );
}
