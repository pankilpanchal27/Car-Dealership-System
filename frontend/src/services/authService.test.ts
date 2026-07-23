import { describe, expect, it, vi } from "vitest";
import api from "../api/api";
import { login } from "./authService";

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
        token: "jwt-token",
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
});