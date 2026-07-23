import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("calls onSearch with entered filters", () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/e.g. Toyota/i), {
      target: { value: "Toyota" },
    });

    fireEvent.change(screen.getByPlaceholderText(/e.g. Corolla/i), {
      target: { value: "Fortuner" },
    });

    fireEvent.change(screen.getByPlaceholderText(/e.g. SUV/i), {
      target: { value: "SUV" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      minPrice: undefined,
      maxPrice: undefined,
    });
  });

  it("clears all fields", () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/e.g. Toyota/i), {
      target: { value: "Toyota" },
    });

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByPlaceholderText(/e.g. Toyota/i)).toHaveValue("");
    expect(onSearch).toHaveBeenCalledWith({});
  });
});