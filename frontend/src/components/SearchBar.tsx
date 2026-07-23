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

  return (
    <div className="mb-8 w-full border-t-[4px] border-gold bg-white p-4 shadow-sm rounded-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 items-end">
        {/* Make */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Make
          </label>
          <input
            type="text"
            placeholder="e.g. Toyota"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full input-minimal px-3 py-2 text-sm rounded-sm"
          />
        </div>
        {/* Model */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Model
          </label>
          <input
            type="text"
            placeholder="e.g. Corolla"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full input-minimal px-3 py-2 text-sm rounded-sm"
          />
        </div>
        {/* Category */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. SUV"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full input-minimal px-3 py-2 text-sm rounded-sm"
          />
        </div>
        {/* Min Price */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Min Price
          </label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full input-minimal px-3 py-2 text-sm rounded-sm"
          />
        </div>
        {/* Max Price */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Max Price
          </label>
          <input
            type="number"
            placeholder="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full input-minimal px-3 py-2 text-sm rounded-sm"
          />
        </div>
        {/* Actions */}
        <div className="flex gap-2 lg:col-span-2">
          <button
            type="button"
            onClick={handleSearch}
            className="flex-1 bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-xs px-4 py-2.5 transition rounded-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold uppercase tracking-widest text-xs px-4 py-2.5 transition rounded-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}