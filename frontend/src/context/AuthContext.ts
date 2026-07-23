import { createContext } from "react";

export interface AuthUser {
  id: string;
  role: "user" | "admin";
}

export interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);