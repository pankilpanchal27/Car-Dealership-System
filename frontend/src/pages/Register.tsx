import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../services/authService";
import { useAuth } from "../context/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    try {
      const response = await registerService({
        name,
        email,
        password,
      });

      login(response.token);

      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block">
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;