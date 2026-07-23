import { useState } from "react";

interface SearchFilters {
  make?: string;
  model?: string;
  category?: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({
      make: make.trim() || undefined,
      model: model.trim() || undefined,
      category: category.trim() || undefined,
    });
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    setCategory("");

    onSearch({});
  };

  return (
    <div className="mb-6 rounded-lg border bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Search Vehicles
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="rounded border p-2 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="rounded border p-2 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleSearch}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchBar;