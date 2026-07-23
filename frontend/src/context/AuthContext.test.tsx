import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";

function TestComponent() {
  const { isAuthenticated } = useAuth();

  return (
    <p>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
  );
}

describe("AuthContext", () => {
  it("starts unauthenticated", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(
      screen.getByText("Not Authenticated")
    ).toBeInTheDocument();
  });
})
it("logs in by storing the token", () => {
  function TestComponent() {
    const { login, isAuthenticated } = useAuth();

    return (
      <>
        <button onClick={() => login("jwt-token")}>Login</button>
        <span>{isAuthenticated ? "Authenticated" : "Guest"}</span>
      </>
    );
  }

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByText("Authenticated")).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBe("jwt-token");
});