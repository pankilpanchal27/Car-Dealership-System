import api from "./api";

describe("Axios API Client", () => {
  it("uses the backend base URL", () => {
    expect(api.defaults.baseURL).toBe("http://localhost:5000/api");
  });
});