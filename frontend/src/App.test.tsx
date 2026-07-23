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

    // The redesigned login page shows the app brand as h1 and form heading as h2
    expect(
      screen.getByRole("heading", { name: /car dealership/i })
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