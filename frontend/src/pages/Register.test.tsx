import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import { AuthProvider } from "../context/AuthProvider";
import Register from "./Register";
import * as authService from "../services/authService";

vi.mock("../services/authService");

describe("Register Page", () => {
  it("registers the user and redirects to dashboard", async () => {
    vi.mocked(authService.register).mockResolvedValue({
      success: true,
      token: "jwt-token",
      user: {
        _id: "1",
        name: "Pankil",
        email: "test@example.com",
        role: "user",
      },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Pankil" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        name: "Pankil",
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});