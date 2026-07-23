import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";

// Create a minimal valid JWT with role: "admin"
function makeJwt(payload: object) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

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

it("decodes user role from JWT token on login", () => {
  const adminToken = makeJwt({ id: "abc123", role: "admin" });

  function TestComponent() {
    const { login, user } = useAuth();

    return (
      <>
        <button onClick={() => login(adminToken)}>Login</button>
        <span data-testid="role">{user?.role ?? "none"}</span>
      </>
    );
  }

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByTestId("role").textContent).toBe("admin");
});