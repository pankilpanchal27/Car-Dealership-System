import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await doLogin(email, password);
  }

  async function doLogin(e: string, p: string) {
    setError("");
    setLoading(true);
    try {
      const response = await loginService({ email: e, password: p });
      login(response.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleDemoAdmin = () => {
    setEmail("admin@gmail.com");
    setPassword("admin1234");
    doLogin("admin@gmail.com", "admin1234");
  };

  const handleDemoCustomer = () => {
    setEmail("customer@gmail.com");
    setPassword("cust1234");
    doLogin("customer@gmail.com", "cust1234");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Form (Light) */}
      <div className="flex w-full flex-col justify-center bg-gray-bg px-8 lg:w-1/2 lg:px-24 relative">
        <div className="w-full max-w-md mx-auto relative z-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 flex flex-col items-center"
          >
            <h1 className="text-3xl font-heading text-navy mb-1 mt-2">
              Welcome Back
            </h1>
            <p className="text-sm font-medium text-gray-500 mb-8">
              Sign in to your account
            </p>

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
              {loading ? "SIGNING IN…" : "SIGN IN"}
            </button>

            {/* Demo Access Box */}
            <div className="w-full rounded-lg bg-gray-50 border border-gray-100 p-4 relative mb-6">
              <div className="absolute -top-3 left-4 bg-white border border-gray-200 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold inline-block"></span>
                Demo Access
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="flex items-center justify-between bg-white rounded border border-gray-200 p-3 hover:border-gold transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Administrator</p>
                      <p className="text-xs text-gray-500">admin@gmail.com</p>
                    </div>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded group-hover:bg-gold group-hover:text-white transition">
                    Auto-Fill
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleDemoCustomer}
                  className="flex items-center justify-between bg-white rounded border border-gray-200 p-3 hover:border-gold transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Customer</p>
                      <p className="text-xs text-gray-500">customer@gmail.com</p>
                    </div>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded group-hover:bg-gold group-hover:text-white transition">
                    Auto-Fill
                  </div>
                </button>
              </div>
            </div>

            <p className="text-center text-sm font-medium text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-gold transition hover:text-gold-hover">
                Register here
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
            PREMIUM INVENTORY
          </h1>
          <p className="text-gray-300 text-lg font-medium leading-relaxed">
            Experience luxury and performance. Log in to browse our curated collection of elite vehicles and drive away today.
          </p>
        </div>
      </div>
    </div>
  );
}