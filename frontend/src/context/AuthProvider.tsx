import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Decodes the payload of a JWT token without verifying the signature.
 * Used client-side to extract user info (id, role) for UI rendering only.
 */
function decodeToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.id, role: payload.role };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("token");
    return stored ? decodeToken(stored) : null;
  });

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(decodeToken(jwt));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}