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

      {/* Right side: Dark Navy visual (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center bg-navy overflow-hidden">
        
        {/* Subtle geometric circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"></div>

        <div className="relative z-10 text-center mb-16 max-w-md px-8">
          <h1 className="text-5xl font-heading text-white mb-4 tracking-wider">
            FIND YOUR NEXT CAR
          </h1>
          <p className="text-gray-400 text-lg">
            Log in to browse our premium lot and drive away today.
          </p>
        </div>

        {/* Minimal SVG Car Line Art */}
        <div className="relative z-10 w-full max-w-[500px] px-8">
          <svg viewBox="0 0 400 150" className="w-full h-auto drop-shadow-[0_0_15px_rgba(203,163,101,0.2)]">
            {/* Ground line */}
            <line x1="10" y1="120" x2="390" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Car outline */}
            <path 
              d="M 40,110 
                 C 20,110 30,80 70,75 
                 L 110,72 
                 L 160,40 
                 C 200,10 250,15 280,45 
                 L 350,75 
                 C 380,85 370,110 350,110 
                 Z" 
              fill="none" 
              stroke="#cba365" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />
            {/* Windows */}
            <path 
              d="M 165,45 
                 L 120,72 
                 L 220,72 
                 Z" 
              fill="none" 
              stroke="#cba365" 
              strokeWidth="2" 
            />
            <path 
              d="M 230,72 
                 L 270,45
                 C 285,55 315,65 330,75
                 L 230,72
                 Z" 
              fill="none" 
              stroke="#cba365" 
              strokeWidth="2" 
            />
            {/* Wheels */}
            <circle cx="95" cy="110" r="15" fill="none" stroke="#cba365" strokeWidth="2" />
            <circle cx="95" cy="110" r="3" fill="#cba365" />
            
            <circle cx="310" cy="110" r="15" fill="none" stroke="#cba365" strokeWidth="2" />
            <circle cx="310" cy="110" r="3" fill="#cba365" />

            {/* Wheelbase measurement marks */}
            <line x1="95" y1="120" x2="95" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="310" y1="120" x2="310" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="95" y1="130" x2="310" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="202.5" y="142" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">WHEELBASE</text>
          </svg>
        </div>
      </div>
    </div>
  );
}