import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";
import * as useThemeModule from "../context/useTheme";

describe("ThemeToggle Component", () => {
  it("renders a switch role and toggles theme on click", () => {
    const toggleTheme = vi.fn();
    
    // Mock useTheme to return light theme initially
    vi.spyOn(useThemeModule, "useTheme").mockReturnValue({
      theme: "light",
      toggleTheme,
    });
    
    const { rerender } = render(<ThemeToggle />);
    
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
    
    // Check if the sun icon is rendered
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    
    fireEvent.click(switchEl);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
    
    // Mock useTheme to return dark theme
    vi.spyOn(useThemeModule, "useTheme").mockReturnValue({
      theme: "dark",
      toggleTheme,
    });
    
    rerender(<ThemeToggle />);
    
    expect(switchEl).toHaveAttribute("aria-checked", "true");
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });
});
