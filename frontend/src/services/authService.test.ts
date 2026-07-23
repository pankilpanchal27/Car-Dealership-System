import { describe, expect, it, vi } from "vitest";
import api from "../api/api";
import { login, register } from "./authService";

vi.mock("../api/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Auth Service", () => {
  it("calls the login endpoint", async () => {
    const post = vi.mocked(api.post);

    post.mockResolvedValue({
      data: {
        success: true,
        token: "jwt-token",
        user: {
          _id: "1",
          name: "Pankil",
          email: "test@example.com",
          role: "user",
        },
      },
    });

    await login({
      email: "test@example.com",
      password: "password123",
    });

    expect(post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });
  });

  it("calls the register endpoint", async () => {
    const post = vi.mocked(api.post);
  
    post.mockResolvedValue({
      data: {
        success: true,
        token: "jwt-token",
        user: {
          _id: "1",
          name: "Pankil",
          email: "test@example.com",
          role: "user",
        },
      },
    });
  
    await register({
      name: "Pankil",
      email: "test@example.com",
      password: "password123",
    });
  
    expect(post).toHaveBeenCalledWith("/auth/register", {
      name: "Pankil",
      email: "test@example.com",
      password: "password123",
    });
  });
});