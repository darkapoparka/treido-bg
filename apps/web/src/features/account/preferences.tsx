"use client";
import { useRef, useState } from "react";
import { useAccount } from "./state";
import { Icon } from "../discovery/icons";
const sizes = {
  shoeSize: [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
  ],
  shirtSize: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  pantsSize: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
};
const skinTypes = [
  "Aging",
  "Combination",
  "Demanding",
  "Dry",
  "Mature",
  "Normal",
  "Oily",
  "Problem",
  "Rough",
  "Sensitive",
  "Very dry",
  "Wet",
  "With redness",
];
export function Preferences({ personId }: { personId?: string }) {
  const {
    profile,
    updateProfile,
    preferences: choices,
    setPreferences: setChoices,
  } = useAccount();
  const choiceKey = (key: string) => (personId ? `${personId}:${key}` : key);
  const [expanded, setExpanded] = useState("");
  const [skin, setSkin] = useState(() =>
    ["skinType", "undertone", "tone"].some((key) =>
      Boolean(choices[choiceKey(key)]?.length),
    ),
  );
  const [hair, setHair] = useState(() =>
    ["hairType", "hairColor"].some((key) =>
      Boolean(choices[choiceKey(key)]?.length),
    ),
  );
  const sizePanel = useRef<HTMLDivElement>(null);
  const skinPanel = useRef<HTMLDivElement>(null);

  function alignPanel(panel: { current: HTMLDivElement | null }, top: number) {
    requestAnimationFrame(() => {
      const current = panel.current;
      if (!current) return;
      window.scrollBy(0, current.getBoundingClientRect().top - top);
    });
  }

  function row(
    key: string,
    label: string,
    options: string[],
    multiple = false,
    colors?: string[],
  ) {
    const selected = choices[choiceKey(key)] ?? [];
    return (
      <div className={`preference-section preference-${key}`} key={key}>
        <button
          className="profile-field"
          aria-expanded={expanded === key}
          aria-label={`${label}${selected.length ? ` ${selected.join(" ")}` : ""}`}
          onClick={() => {
            const bottom = skinPanel.current?.getBoundingClientRect().bottom;
            setExpanded(expanded === key ? "" : key);
            // Keep the following controls in place when a skin group changes height.
            if (
              bottom !== undefined &&
              ["skinType", "undertone", "tone"].includes(key)
            ) {
              requestAnimationFrame(() => {
                const panel = skinPanel.current;
                if (panel)
                  window.scrollBy(
                    0,
                    panel.getBoundingClientRect().bottom - bottom,
                  );
              });
            }
          }}
        >
          <span>{label}</span>
          <span className="selected-preferences">
            {expanded !== key && selected.length
              ? selected.map((value) => {
                  const swatch =
                    colors?.[options.indexOf(value)] ??
                    (key === "hairColor" && value === "Black"
                      ? "#000"
                      : undefined);
                  return (
                    <b key={value}>
                      {swatch && (
                        <i aria-hidden="true" style={{ background: swatch }} />
                      )}
                      {value}
                    </b>
                  );
                })
              : expanded === key
                ? null
                : `Add ${label.toLowerCase()}`}
          </span>
          <Icon name="chevron" />
        </button>
        {expanded === key && (
          <div className={`preference-chips ${colors ? "color-chips" : ""}`}>
            {options.map((option, i) => (
              <button
                key={option}
                aria-label={option}
                aria-pressed={selected.includes(option)}
                className={selected.includes(option) ? "selected" : ""}
                style={colors ? { background: colors[i] } : undefined}
                onClick={() =>
                  setChoices({
                    ...choices,
                    [choiceKey(key)]: multiple
                      ? selected.includes(option)
                        ? selected.filter((v) => v !== option)
                        : [...selected, option]
                      : [option],
                  })
                }
              >
                {colors ? "" : option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <div ref={sizePanel} className="account-panel field-panel">
        {Object.entries(sizes).map(([key, options]) => {
          const field = key as keyof typeof sizes;
          const label =
            field === "shoeSize"
              ? "Shoe size"
              : field === "shirtSize"
                ? "Shirt size"
                : "Pants size";
          return (
            <div key={key} className="preference-size">
              <button
                className="profile-field"
                aria-expanded={expanded === key}
                aria-label={`${label} ${personId ? (choices[choiceKey(field)]?.[0] ?? "") : profile[field]}`.trim()}
                onClick={() => {
                  const next = expanded === key ? "" : key;
                  setExpanded(next);
                  if (next) alignPanel(sizePanel, 155);
                }}
              >
                <span>{label}</span>
                <span className="selected-preferences">
                  {expanded !== key &&
                  (personId
                    ? choices[choiceKey(field)]?.[0]
                    : profile[field]) ? (
                    <b>
                      {personId
                        ? choices[choiceKey(field)]?.[0]
                        : profile[field]}
                    </b>
                  ) : expanded === key ? null : (
                    `Add ${label.toLowerCase()}`
                  )}
                </span>
                <Icon name="chevron" />
              </button>
              {expanded === key && (
                <div className="preference-chips size-chips">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={
                        (personId
                          ? choices[choiceKey(field)]?.[0]
                          : profile[field]) === option
                          ? "selected"
                          : ""
                      }
                      aria-pressed={
                        (personId
                          ? choices[choiceKey(field)]?.[0]
                          : profile[field]) === option
                      }
                      onClick={() =>
                        personId
                          ? setChoices({
                              ...choices,
                              [choiceKey(field)]: [option],
                            })
                          : updateProfile({ [field]: option })
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {skin ? (
        <div ref={skinPanel} className="account-panel field-panel">
          {row("skinType", "Skin type", skinTypes, true)}
          {row(
            "undertone",
            "Skin undertone",
            [
              "Brown",
              "Blue",
              "Pink",
              "Yellow",
              "Gray",
              "Cream",
              "Light pink",
              "Olive",
              "Pink/Yellow",
              "Coral",
              "Hot pink",
              "Orange",
              "Golden",
              "Lemon",
            ],
            false,
            [
              "#82491f",
              "#5380b0",
              "#ed73b0",
              "#f9d848",
              "#d3d3d3",
              "#eee697",
              "#f6c2cb",
              "#818025",
              "#fbe5ba",
              "#ed6d52",
              "#eb3892",
              "#f2a939",
              "#f9d848",
              "#feff54",
            ],
          )}
          {row(
            "tone",
            "Skin tone",
            [
              "Brown skin",
              "Dark skin",
              "Deep skin",
              "Fair skin",
              "Tan skin",
              "Golden skin",
              "Beige skin",
              "Peach skin",
              "Warm skin",
            ],
            false,
            [
              "#82491f",
              "#614427",
              "#3a2923",
              "#f1deb7",
              "#d9b98d",
              "#c3884c",
              "#cdb592",
              "#e8a76b",
              "#c46e33",
            ],
          )}
        </div>
      ) : (
        <button
          className="preference-add"
          onClick={() => {
            setSkin(true);
            setExpanded("skinType");
            alignPanel(skinPanel, 114);
          }}
        >
          + Skin care
        </button>
      )}
      {hair ? (
        <div className="account-panel field-panel">
          {row(
            "hairType",
            "Hair type",
            [
              "Normal",
              "Dry",
              "Oily",
              "Fine",
              "Thick",
              "Curly",
              "Straight",
              "Wavy",
              "Coily",
            ],
            true,
          )}
          {row("hairColor", "Hair color", [
            "Black",
            "Brown",
            "Blonde",
            "Red",
            "Gray",
            "White",
          ])}{" "}
        </div>
      ) : (
        <button className="preference-add" onClick={() => setHair(true)}>
          + Hair care
        </button>
      )}
    </>
  );
}
