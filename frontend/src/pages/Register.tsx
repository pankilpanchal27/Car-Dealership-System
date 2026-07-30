import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerService } from "../services/authService";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
          <h1 className="auth-hero-title">Join The Fleet</h1>
          <p className="auth-hero-desc">
            Create your account to get exclusive access to our premium vehicle inventory and special dealership offers.
          </p>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="auth-panel">
        {/* Theme toggle top-right */}
        <div style={{ position: "absolute", top: 20, right: 24 }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg data-testid="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg data-testid="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        <div className="auth-card">
          {/* Brand */}
          <div className="auth-brand">
            <div className="auth-logo-mark">C</div>
            <div className="auth-logo-text">CarDealer</div>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us to browse and manage the premium inventory</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="form-input"
              />
            </div>

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
                <><span className="btn-spinner" /> Creating account…</>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)", marginTop: 24 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--text-accent)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}