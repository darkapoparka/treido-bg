"use client";
import { useRef, useState } from "react";
import { useAccount } from "./state";
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
          onClick={() => setExpanded(expanded === key ? "" : key)}
        >
          <span>{label}</span>
          <span className="selected-preferences">
            {expanded !== key && selected.length
              ? selected.map((value) => {
                  const swatch = colors?.[options.indexOf(value)];
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
          <span>{expanded === key ? "⌃" : "⌄"}</span>
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
                {colors ? (selected.includes(option) ? "✓" : "") : option}
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
            <div key={key}>
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
                <span>{expanded === key ? "⌃" : "⌄"}</span>
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
              "Pink/Yellow",
              "Light pink",
              "Olive",
              "Cream",
              "Coral",
              "Hot pink",
              "Orange",
              "Golden",
              "Lemon",
            ],
            false,
            [
              "#a77655",
              "#5889c8",
              "#eaa0b8",
              "#f5d05c",
              "#aaa",
              "#fff3b6",
              "#f8d3da",
              "#a6a558",
              "#f6e9c6",
              "#ed9f86",
              "#ec6b98",
              "#efad57",
              "#f4cc41",
              "#fff29b",
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
              "#9f6948",
              "#734733",
              "#49352b",
              "#f6e2c4",
              "#c7976a",
              "#b98548",
              "#e8c498",
              "#e9b898",
              "#b97548",
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
