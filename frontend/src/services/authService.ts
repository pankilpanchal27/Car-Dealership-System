import api from "../api/api";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}