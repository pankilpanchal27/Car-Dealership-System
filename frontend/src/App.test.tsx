import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Routing", () => {
  it("renders login page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // The redesigned login page shows "Welcome back" as h1
    expect(
      screen.getByRole("heading", { name: /welcome back/i })
    ).toBeInTheDocument();
  });

  it("renders register page", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /create account/i })
    ).toBeInTheDocument();
  });
});