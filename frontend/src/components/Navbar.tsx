import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";

interface NavbarProps {
  isAdmin: boolean;
  isActuallyAdmin?: boolean;
  onToggleView?: () => void;
  onLogout: () => void;
}

export default function Navbar({
  isAdmin,
  isActuallyAdmin,
  onToggleView,
  onLogout,
}: NavbarProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const userName = user?.name || user?.role || "User";
  const initials = userName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const title = isAdmin ? "ADMIN DASHBOARD" : "VEHICLE INVENTORY";
  const subtitle = isAdmin
    ? "Manage inventory, stock & vehicle details"
    : "Browse and purchase vehicles";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo-mark">C</div>
          <div>
            <div className="navbar-title">{title}</div>
            <div className="navbar-subtitle">{subtitle}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* User pill */}
          <div className="navbar-user-pill">
            <div className="navbar-avatar">{initials}</div>
            <span>{userName}</span>
          </div>

          {/* Admin / View Store toggle */}
          {isActuallyAdmin && (
            <button
              onClick={onToggleView}
              className="btn btn-secondary btn-icon"
              aria-label={isAdmin ? "View Store" : "Admin Panel"}
              title={isAdmin ? "View Store" : "Admin Panel"}
            >
              {isAdmin ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              )}
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                {isAdmin ? "Store" : "Admin"}
              </span>
            </button>
          )}

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg data-testid="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg data-testid="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="btn btn-ghost"
            aria-label="Logout"
            style={{ fontSize: 13, padding: "8px 16px" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
