import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

describe("Register Page", () => {
  it("renders the registration form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });
});