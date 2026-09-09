"use client";
import { useState } from "react";
import { Sheet } from "./components";
import { Icon } from "./icons";
export type SearchFilters = {
  deals: boolean;
  following: boolean;
  sort: string;
  category: string;
  color: string;
  size: string;
  gender: string;
  price: string;
  ratings: string;
  country: string;
  origin: string;
};
export const emptyFilters: SearchFilters = {
  deals: false,
  following: false,
  sort: "Relevance",
  category: "",
  color: "",
  size: "",
  gender: "",
  price: "",
  ratings: "",
  country: "",
  origin: "",
};
const options = {
  sort: [
    "Relevance",
    "Newest",
    "Lowest → Highest Price",
    "Highest → Lowest Price",
  ],
  category: [
    "All Categories",
    "Women",
    "Men",
    "Beauty",
    "Food & drinks",
    "Baby & toddler",
    "Home",
    "Fitness & nutrition",
    "Accessories",
  ],
  color: ["Black", "Blue", "Pink"],
  size: ["XS", "S", "M", "L", "One size"],
  gender: ["Women", "Men", "Unisex"],
  price: ["Under $25", "Under $50", "Under $100", "$100 and up"],
  ratings: ["4 stars and up", "4.5 stars and up"],
  country: ["United States"],
};
const names = {
  sort: "Sort by",
  category: "Category",
  color: "Color",
  size: "Size",
  gender: "Gender",
  price: "Price",
  ratings: "Ratings",
  country: "Ships to",
};
type Section = keyof typeof options;
export function Filters({
  open,
  onClose,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  value: SearchFilters;
  onChange: (value: SearchFilters) => void;
}) {
  const [section, setSection] = useState<Section | null>(null);
  const [categoryPath, setCategoryPath] = useState("");
  const choose = (key: Section, option: string) =>
    onChange({ ...value, [key]: value[key] === option ? "" : option });
  const rows = (key: Section, list: string[]) =>
    list.map((option) => (
      <button
        key={option}
        aria-pressed={value[key] === option}
        onClick={() =>
          key === "category" && option === "Women"
            ? setCategoryPath("Women")
            : choose(key, option)
        }
      >
        {option}
        {key === "category" && option === "Women" ? (
          <Icon name="arrow" />
        ) : (
          <span
            className={`radio-outline ${value[key] === option ? "selected" : ""}`}
          />
        )}
      </button>
    ));
  return (
    <>
      <Sheet
        open={open}
        title="Filter"
        className={`filter-tall ${section ? "filter-covered" : ""}`}
        onClose={onClose}
      >
        <div className="filter-options">
          <label>
            Your deals
            <input
              type="checkbox"
              checked={value.deals}
              onChange={(e) => onChange({ ...value, deals: e.target.checked })}
            />
          </label>
          {(Object.keys(options) as Section[]).map((key) => (
            <button key={key} onClick={() => setSection(key)}>
              {names[key]}
              <span className="filter-value">
                {value[key]}
                <Icon name="back" />
              </span>
            </button>
          ))}
        </div>
        <div className="sheet-actions">
          <button className="pill" onClick={() => onChange(emptyFilters)}>
            Clear all
          </button>
          <button className="primary" onClick={onClose}>
            Done
          </button>
        </div>
      </Sheet>
      <Sheet
        open={open && !!section}
        title={section ? names[section] : "Filter"}
        className={`${section === "sort" ? "filter-short" : "filter-tall"} ${categoryPath ? "filter-covered" : ""}`}
        onClose={() => setSection(null)}
      >
        <div className="filter-options">
          {section && rows(section, options[section])}
        </div>
        <div className="sheet-actions">
          <button
            className="pill"
            disabled={
              !!section &&
              value[section] === (section === "sort" ? "Relevance" : "")
            }
            onClick={() =>
              section &&
              onChange({
                ...value,
                [section]: section === "sort" ? "Relevance" : "",
              })
            }
          >
            Reset
          </button>
          <button className="primary" onClick={() => setSection(null)}>
            Done
          </button>
        </div>
      </Sheet>
      <Sheet
        open={open && section === "category" && !!categoryPath}
        title="Women"
        className="filter-tall"
        onClose={() => setCategoryPath("")}
      >
        <div className="filter-options">
          {rows("category", [
            "All Women",
            "Shirts & tops",
            "Shoes",
            "Dresses",
            "Pants",
            "Intimates",
            "Activewear",
            "Socks & hosiery",
            "Swimwear",
          ])}
        </div>
        <div className="sheet-actions">
          <button
            className="pill"
            onClick={() => onChange({ ...value, category: "" })}
          >
            Reset
          </button>
          <button className="primary" onClick={() => setCategoryPath("")}>
            Done
          </button>
        </div>
      </Sheet>
    </>
  );
}
