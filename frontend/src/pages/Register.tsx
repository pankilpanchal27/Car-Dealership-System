import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerService } from "../services/authService";
import { useAuth } from "../context/useAuth";

export default function Register() {
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
    <div className="flex min-h-screen">
      {/* Left side: Form (Light) */}
      <div className="flex w-full flex-col justify-center bg-gray-bg px-8 lg:w-1/2 lg:px-24 relative">
        <div className="w-full max-w-md mx-auto relative z-10 my-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 flex flex-col items-center"
          >
            <h1 className="text-3xl font-heading text-navy mb-1 mt-2">
              Create Account
            </h1>
            <p className="text-sm font-medium text-gray-500 mb-8 text-center">
              Join us to browse and manage the premium inventory.
            </p>

            <div className="w-full mb-5 flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-navy">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input-minimal"
              />
            </div>

            <div className="w-full mb-5 flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-navy">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-minimal"
              />
            </div>

            <div className="w-full mb-6 flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-minimal"
              />
            </div>

            {error && (
              <p className="w-full mb-5 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-600 border border-red-200">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full mb-6">
              {loading ? "CREATING ACCOUNT…" : "REGISTER"}
            </button>

            <p className="text-center text-sm font-medium text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-gold transition hover:text-gold-hover">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side: Photo visual (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-end bg-navy overflow-hidden">
        <img 
          src="/assets/showroom_showcase.png" 
          alt="Premium luxury car in modern showroom" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"></div>
        
        <div className="relative z-10 text-center mb-24 max-w-lg px-8 text-white">
          <h1 className="text-5xl font-heading mb-4 tracking-wider">
            JOIN THE FLEET
          </h1>
          <p className="text-gray-300 text-lg font-medium leading-relaxed">
            Create your account to get exclusive access to our premium vehicle inventory and special dealership offers.
          </p>
        </div>
      </div>
    </div>
  );
}