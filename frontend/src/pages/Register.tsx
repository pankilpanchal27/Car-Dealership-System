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
    <div className="flex min-h-screen bg-[#04060d]">
      {/* Left side: Form */}
      <div className="relative flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        
        <div className="relative z-10 w-full max-w-md mx-auto animate-fade-up">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              🚗
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              Car Dealership
            </span>
          </div>

          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              Create account
            </h1>
            <p className="mb-8 text-sm text-gray-400">
              Join us to browse and manage the premium inventory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="stagger flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
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

            <div className="flex flex-col gap-1.5">
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

            <div className="flex flex-col gap-1.5">
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
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary mt-2">
              {loading ? "Creating account…" : "Register"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side: Image showcase (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-[#090b14] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-[#04060d]/80 to-[#04060d]"></div>
        <img
          src="/assets/login_hero_car.png"
          alt="Concept Car Wireframe"
          className="relative z-10 w-4/5 max-w-2xl object-contain drop-shadow-[0_0_50px_rgba(139,92,246,0.5)] animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute bottom-12 right-12 z-20 text-right">
          <h2 className="text-2xl font-bold text-white shimmer-text">
            APEX PERFORMANCE
          </h2>
          <p className="text-violet-400 tracking-widest text-sm uppercase mt-1">
            Engineered for the future
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;