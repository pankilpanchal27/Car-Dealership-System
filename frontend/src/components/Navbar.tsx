import { useAuth } from "../context/useAuth";

interface NavbarProps {
  isAdmin: boolean;
  isActuallyAdmin?: boolean;
  viewAsCustomer?: boolean;
  onToggleView?: () => void;
  onLogout: () => void;
}

export default function Navbar({ isAdmin, isActuallyAdmin, viewAsCustomer, onToggleView, onLogout }: NavbarProps) {
  const { user } = useAuth();
  const userName = user?.name || user?.role || "user";

  if (isAdmin) {
    return (
      <header className="w-full bg-navy border-b border-white/5 shadow-md">
        <div className="flex h-1 bg-gold w-full" />
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          {/* Left Side Branding */}
          <div>
            <h1 className="text-3xl font-heading text-white tracking-wider mb-1">
              ADMIN DASHBOARD
            </h1>
            <p className="text-sm font-medium text-gray-400">
              Manage inventory, stock, and vehicle details
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gold font-mono">
              Hello, {userName}
            </span>
            <div className="flex items-center gap-3">
              {isActuallyAdmin && (
                <button
                  onClick={onToggleView}
                  className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10 rounded"
                >
                  VIEW STORE
                </button>
              )}
              <button
                onClick={onLogout}
                className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10 rounded"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Customer Navbar (Now uses Dark Theme)
  return (
    <header className="w-full bg-navy border-b border-white/5 shadow-md">
      <div className="flex h-1 bg-gold w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left Side Branding */}
        <div>
          <h1 className="text-3xl font-heading text-white tracking-wider mb-1">
            VEHICLE INVENTORY
          </h1>
          <p className="text-sm font-medium text-gray-400">
            Browse and purchase vehicles
          </p>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gold font-mono">
            Hello, {userName}
          </span>
          <div className="flex items-center gap-3">
            {isActuallyAdmin && (
              <button
                onClick={onToggleView}
                className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold transition hover:bg-white/10 rounded"
              >
                ADMIN PANEL
              </button>
            )}
            <button
              onClick={onLogout}
              className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10 rounded"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
