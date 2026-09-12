"use client";
import { useState } from "react";
import { Sheet } from "./components";
import { Icon } from "./icons";
import {
  categoryValue,
  emptyFilters,
  filterOptions,
  womenCategories,
  type FilterSection,
  type SearchFilters,
} from "./search-model";

export { emptyFilters } from "./search-model";
export type { SearchFilters } from "./search-model";

const names: Record<FilterSection, string> = {
  sort: "Sort by",
  category: "Category",
  color: "Color",
  size: "Size",
  gender: "Gender",
  price: "Price",
  ratings: "Ratings",
  country: "Ships to",
};

type FilterProps = {
  open: boolean;
  onClose: () => void;
  value: SearchFilters;
  onChange: (value: SearchFilters) => void;
};

export function Filters({ open, ...props }: FilterProps) {
  // Closing the root ends this navigation session. Reopening starts at Filter,
  // not at an invisible/stale child left over from a previous visit.
  return open ? <OpenFilters {...props} /> : null;
}

function OpenFilters({ onClose, value, onChange }: Omit<FilterProps, "open">) {
  const [section, setSection] = useState<FilterSection | null>(null);
  const [categoryPath, setCategoryPath] = useState(false);
  const closeSection = () => {
    setCategoryPath(false);
    setSection(null);
  };
  const choose = (key: FilterSection, option: string) =>
    onChange({
      ...value,
      [key]: key === "category" ? categoryValue(option) : option,
    });
  const rows = (key: FilterSection, list: readonly string[]) =>
    list.map((option) => {
      const opensChildren = key === "category" && option === "Women";
      const selected =
        value[key] === (key === "category" ? categoryValue(option) : option);
      return (
        <button
          type="button"
          key={option}
          aria-pressed={opensChildren ? undefined : selected}
          aria-haspopup={opensChildren ? "dialog" : undefined}
          aria-expanded={opensChildren ? categoryPath : undefined}
          onClick={() =>
            opensChildren ? setCategoryPath(true) : choose(key, option)
          }
        >
          {option}
          {opensChildren ? (
            <Icon name="arrow" />
          ) : (
            <span
              aria-hidden="true"
              className={`radio-outline ${selected ? "selected" : ""}`}
            />
          )}
        </button>
      );
    });
  return (
    <>
      <Sheet
        open
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
          {(Object.keys(filterOptions) as FilterSection[]).map((key) => (
            <button
              type="button"
              key={key}
              aria-haspopup="dialog"
              onClick={() => {
                setCategoryPath(false);
                setSection(key);
              }}
            >
              {names[key]}
              <span className="filter-value">
                {value[key]}
                <Icon name="back" />
              </span>
            </button>
          ))}
        </div>
        <div className="sheet-actions">
          <button
            type="button"
            className="pill"
            onClick={() => onChange({ ...emptyFilters })}
          >
            Clear all
          </button>
          <button type="button" className="primary" onClick={onClose}>
            Done
          </button>
        </div>
      </Sheet>
      <Sheet
        open={section !== null}
        title={section ? names[section] : "Filter"}
        className={`${section === "sort" ? "filter-short" : "filter-tall"} ${section === "category" && categoryPath ? "filter-covered" : ""}`}
        onClose={closeSection}
      >
        <div className="filter-options">
          {section && rows(section, filterOptions[section])}
        </div>
        <div className="sheet-actions">
          <button
            type="button"
            className="pill"
            disabled={!section || value[section] === emptyFilters[section]}
            onClick={() =>
              section &&
              onChange({ ...value, [section]: emptyFilters[section] })
            }
          >
            Reset
          </button>
          <button type="button" className="primary" onClick={closeSection}>
            Done
          </button>
        </div>
      </Sheet>
      <Sheet
        open={section === "category" && categoryPath}
        title="Women"
        className="filter-tall"
        onClose={() => setCategoryPath(false)}
      >
        <div className="filter-options">
          {rows("category", womenCategories)}
        </div>
        <div className="sheet-actions">
          <button
            type="button"
            className="pill"
            disabled={!value.category}
            onClick={() => onChange({ ...value, category: "" })}
          >
            Reset
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => setCategoryPath(false)}
          >
            Done
          </button>
        </div>
      </Sheet>
    </>
  );
}
