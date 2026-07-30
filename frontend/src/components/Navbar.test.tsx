import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";

// Mock useAuth
vi.mock("../context/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Mock useTheme
vi.mock("../context/useTheme", () => ({
  useTheme: vi.fn(),
}));

import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";

describe("Navbar", () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "1", role: "user", name: "Test User" },
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
      token: "tok",
    });
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      toggleTheme: vi.fn(),
    });
  });

  it("renders the customer branding when not admin", () => {
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(screen.getByText(/VEHICLE INVENTORY/i)).toBeInTheDocument();
  });

  it("renders the admin branding when admin", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "1", role: "admin", name: "Admin User" },
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
      token: "tok",
    });
    render(<Navbar isAdmin={true} onLogout={vi.fn()} />);
    expect(screen.getByText(/ADMIN DASHBOARD/i)).toBeInTheDocument();
  });

  it("shows a Logout button", () => {
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls onLogout when Logout is clicked", () => {
    const onLogout = vi.fn();
    render(<Navbar isAdmin={false} onLogout={onLogout} />);
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("renders the theme toggle button", () => {
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it("calls toggleTheme when the theme toggle button is clicked", () => {
    const toggleTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({ theme: "dark", toggleTheme });
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it("displays the sun icon in dark mode", () => {
    vi.mocked(useTheme).mockReturnValue({ theme: "dark", toggleTheme: vi.fn() });
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
  });

  it("displays the moon icon in light mode", () => {
    vi.mocked(useTheme).mockReturnValue({ theme: "light", toggleTheme: vi.fn() });
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
  });

  it("shows user name in avatar pill", () => {
    render(<Navbar isAdmin={false} onLogout={vi.fn()} />);
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });
});
