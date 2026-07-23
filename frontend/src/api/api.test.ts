import api from "./api";

describe("Axios API Client", () => {
  it("uses the backend base URL", () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL);
  });
});