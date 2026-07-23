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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04060d] px-4">
      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute -bottom-40 right-1/2 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
      
      <div className="relative z-10 w-full max-w-md animate-fade-up my-10">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl ring-1 ring-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            🚗
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create account
          </h1>
          <p className="text-sm text-gray-400">
            Join us to browse the premium inventory
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="glass-strong rounded-2xl p-8 stagger shadow-2xl"
        >
          <div className="mb-5 flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pankil Panchal"
              className="input-dark"
            />
          </div>

          <div className="mb-5 flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-dark"
            />
          </div>

          <div className="mb-6 flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-dark"
            />
          </div>

          {error && (
            <p className="mb-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating account…" : "Register"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;