import { useState } from "react";

interface SearchFilters {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleSearch = () => {
    onSearch({
      make: make.trim() || undefined,
      model: model.trim() || undefined,
      category: category.trim() || undefined,
      minPrice: minPrice.trim() || undefined,
      maxPrice: maxPrice.trim() || undefined,
    });
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onSearch({});
  };

  const hasFilters = make || model || category || minPrice || maxPrice;

  return (
    <div className="search-bar">
      {/* Top row: main input + buttons */}
      <div className="search-top-row">
        <div className="search-main-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Make, model or category…"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="search-main-input"
            aria-label="Search vehicles"
          />
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="btn btn-primary"
          aria-label="Search"
          style={{ flexShrink: 0, padding: "10px 20px", fontSize: 14 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Search
        </button>

        {/* Filters toggle */}
        <button
          type="button"
          onClick={() => setFiltersOpen((p) => !p)}
          className={`btn ${filtersOpen ? "btn-secondary" : "btn-ghost"}`}
          aria-label="Filters"
          aria-expanded={filtersOpen}
          style={{ flexShrink: 0, padding: "10px 16px", fontSize: 14, gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          Filters
          {hasFilters && (
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)", flexShrink: 0
            }} />
          )}
        </button>

        {/* Clear — visible when there are active filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-ghost"
            aria-label="Clear"
            style={{ flexShrink: 0, padding: "10px 14px", fontSize: 14 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Collapsible advanced filters */}
      <div
        data-testid="filters-panel"
        className={`search-filters-panel${filtersOpen ? " open" : ""}`}
      >
        <div className="search-filters-grid">
          <div className="form-group">
            <label className="form-label">Make</label>
            <input
              type="text"
              placeholder="e.g. Toyota"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="form-input"
              style={{ padding: "9px 12px", fontSize: 13 }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Model</label>
            <input
              type="text"
              placeholder="e.g. Corolla"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="form-input"
              style={{ padding: "9px 12px", fontSize: 13 }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input
              type="text"
              placeholder="e.g. SUV"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="form-input"
              style={{ padding: "9px 12px", fontSize: 13 }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Min Price (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="form-input"
              style={{ padding: "9px 12px", fontSize: 13 }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Max Price (₹)</label>
            <input
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="form-input"
              style={{ padding: "9px 12px", fontSize: 13 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}