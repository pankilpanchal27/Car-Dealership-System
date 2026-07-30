import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders the main search input", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/make, model or category/i)).toBeInTheDocument();
  });

  it("advanced filters panel is collapsed by default", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const panel = screen.getByTestId("filters-panel");
    expect(panel).not.toHaveClass("open");
  });

  it("clicking the Filters button expands the panel", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.getByTestId("filters-panel")).toHaveClass("open");
  });

  it("clicking Filters button again collapses the panel", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const btn = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByTestId("filters-panel")).not.toHaveClass("open");
  });

  it("calls onSearch when Search button is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    fireEvent.click(screen.getByRole("button", { name: /^search$/i }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch with empty object when Clear is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    // type something to make the make filter active (so Clear button appears)
    fireEvent.change(screen.getByPlaceholderText(/make, model or category/i), {
      target: { value: "Toyota" },
    });
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(onSearch).toHaveBeenCalledWith({});
  });

  it("passes make and model values to onSearch", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    // open filters
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. toyota/i), {
      target: { value: "Toyota" },
    });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. corolla/i), {
      target: { value: "Corolla" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^search$/i }));
    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({ make: "Toyota", model: "Corolla" })
    );
  });
});