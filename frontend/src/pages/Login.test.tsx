import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import { AuthProvider } from "../context/AuthProvider";
import Login from "./Login";
import * as authService from "../services/authService";

vi.mock("../services/authService");

describe("Login Page", () => {
  it("logs in the user and navigates to dashboard", async () => {
    vi.mocked(authService.login).mockResolvedValue({
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
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});