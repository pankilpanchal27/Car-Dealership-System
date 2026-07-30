import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/useAuth";
import ThemeToggle from "../components/ThemeToggle";


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
    <div className="auth-layout">
      {/* Left: Hero panel (desktop only) */}
      <div className="auth-hero">
        <img
          src="/assets/showroom_showcase.png"
          alt="Premium luxury cars in a modern showroom"
          className="auth-hero-img"
        />
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <h1 className="auth-hero-title">Premium Inventory</h1>
          <p className="auth-hero-desc">
            Experience luxury and performance. Browse our curated collection of elite vehicles and drive away today.
          </p>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="auth-panel">
        {/* Theme toggle top-right */}
        <div style={{ position: "absolute", top: 20, right: 24 }}>
          <ThemeToggle />
        </div>

        <div className="auth-card">
          {/* Brand */}
          <div className="auth-brand">
            <div className="auth-logo-mark">A</div>
            <div className="auth-logo-text">AutoPrime</div>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
              />
            </div>

            {error && (
              <div className="alert alert-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn-full" style={{ padding: "13px 24px", fontSize: 15 }}>
              {loading ? (
                <><span className="btn-spinner" /> Signing in…</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo access */}
          <div style={{ marginTop: 24 }}>
            <div className="demo-box">
              <div className="demo-box-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Quick Demo Access
              </div>

              <button type="button" onClick={handleDemoAdmin} className="demo-row">
                <div className="demo-avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/><path d="M20 21a8 8 0 1 0-16 0"/>
                  </svg>
                </div>
                <div className="demo-info">
                  <div className="demo-name">Administrator</div>
                  <div className="demo-email">admin@gmail.com</div>
                </div>
                <div className="demo-badge">Auto-Fill</div>
              </button>

              <button type="button" onClick={handleDemoCustomer} className="demo-row">
                <div className="demo-avatar" style={{ background: "var(--bg-surface)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="demo-info">
                  <div className="demo-name">Customer</div>
                  <div className="demo-email">customer@gmail.com</div>
                </div>
                <div className="demo-badge">Auto-Fill</div>
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--text-accent)", fontWeight: 600 }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}