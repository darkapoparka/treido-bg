import { referencePreviewEnabled } from "@/features/catalog/queries.server";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!referencePreviewEnabled()) return new Response(null, { status: 404 });
  const { key } = await params;
  const [{ readReferenceMedia }, { readFollowingMedia }, { readSavedMedia }] =
    await Promise.all([
      import("@/features/catalog/reference/media.server"),
      import("@/features/catalog/reference/following-media.server"),
      import("@/features/catalog/reference/saved-media.server"),
    ]);
  const media =
    readSavedMedia(key) ?? readFollowingMedia(key) ?? readReferenceMedia(key);
  if (!media) return new Response(null, { status: 404 });
  try {
    return new Response(new Uint8Array(await media), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "private, no-cache",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return new Response("Reference media is unavailable in this checkout.", {
      status: 503,
    });
  }
}
