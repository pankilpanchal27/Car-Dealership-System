import { render, screen } from "@testing-library/react";
import { useAuth, AuthProvider } from "./AuthContext";

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
}