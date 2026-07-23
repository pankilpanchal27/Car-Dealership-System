import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";

// Mock the hook directly
vi.mock("../context/useAuth", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../context/useAuth";

describe("Navbar", () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "1", role: "user", name: "Test User" },
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
      token: "tok",
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
});
