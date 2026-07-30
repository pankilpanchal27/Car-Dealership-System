import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";
import ThemeContext from "../context/ThemeContext";

describe("ThemeToggle Component", () => {
  it("renders a switch role and toggles theme on click", () => {
    const toggleTheme = vi.fn();
    
    const { rerender } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
    
    // Check if the sun icon is rendered (in light mode, switch is off)
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    
    fireEvent.click(switchEl);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
    
    // Rerender with dark mode
    rerender(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    expect(switchEl).toHaveAttribute("aria-checked", "true");
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });
});
