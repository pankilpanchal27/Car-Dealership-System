import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

// Helper component to consume the theme context
function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-btn">
        Toggle
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders children without crashing", () => {
    render(
      <ThemeProvider>
        <span>child</span>
      </ThemeProvider>
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("defaults to dark theme when no localStorage value exists", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
  });

  it("reads the theme from localStorage on mount", () => {
    localStorage.setItem("cds-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-value").textContent).toBe("light");
  });

  it("toggles from dark to light when toggleTheme is called", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      fireEvent.click(screen.getByTestId("toggle-btn"));
    });
    expect(screen.getByTestId("theme-value").textContent).toBe("light");
  });

  it("toggles from light back to dark on second call", () => {
    localStorage.setItem("cds-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      fireEvent.click(screen.getByTestId("toggle-btn"));
    });
    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
  });

  it("persists theme choice to localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    act(() => {
      fireEvent.click(screen.getByTestId("toggle-btn"));
    });
    expect(localStorage.getItem("cds-theme")).toBe("light");
  });

  it("applies data-theme attribute to <html> element", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
