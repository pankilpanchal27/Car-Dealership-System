import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the app branding", () => {
    render(
      <Navbar isAdmin={false} onLogout={vi.fn()} />
    );

    expect(screen.getByText(/Car Dealership/i)).toBeInTheDocument();
  });

  it("shows a Logout button", () => {
    render(
      <Navbar isAdmin={false} onLogout={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls onLogout when Logout is clicked", () => {
    const onLogout = vi.fn();
    render(<Navbar isAdmin={false} onLogout={onLogout} />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("shows an Admin badge when isAdmin is true", () => {
    render(
      <Navbar isAdmin={true} onLogout={vi.fn()} />
    );

    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it("does not show Admin badge for regular users", () => {
    render(
      <Navbar isAdmin={false} onLogout={vi.fn()} />
    );

    expect(screen.queryByTestId("admin-badge")).not.toBeInTheDocument();
  });
});
