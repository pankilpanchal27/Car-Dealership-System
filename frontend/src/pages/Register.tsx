import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerService } from "../services/authService";
import { useAuth } from "../context/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await registerService({ name, email, password });
      login(response.token);
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-600/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="text-5xl">🚗</span>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Car Dealership
          </h1>
          <p className="text-sm text-gray-400">
            Create an account to get started
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="mb-6 text-xl font-semibold text-white">
            Create account
          </h2>

          <div className="mb-4 flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-400">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pankil Panchal"
              className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="mb-4 flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-400">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Register"}
          </button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;