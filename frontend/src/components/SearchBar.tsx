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

function SearchBar({ onSearch }: SearchBarProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    setMake(""); setModel(""); setCategory(""); setMinPrice(""); setMaxPrice("");
    onSearch({});
  };

  const inputClass =
    "rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
        Filter Vehicles
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Min Price (₹)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Max Price (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={inputClass}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 active:scale-95"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchBar;