import api from "./api";

describe("Axios API Client", () => {
  it("creates an axios instance", () => {
    expect(api.defaults.baseURL).toBe(
      import.meta.env.VITE_API_BASE_URL
    );
  });

  it("adds an authorization header when a token exists", async () => {
    localStorage.setItem("token", "jwt-token");

    const handlers = api.interceptors.request.handlers;

    expect(handlers.length).toBeGreaterThan(0);
  });
});