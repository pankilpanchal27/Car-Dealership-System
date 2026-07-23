interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

/**
 * Top navigation bar — shows branding, admin badge, and logout button.
 */
export default function Navbar({ isAdmin, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚗</span>
          <span className="text-xl font-bold tracking-tight text-white">
            Car Dealership
          </span>
          {isAdmin && (
            <span
              data-testid="admin-badge"
              className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/40"
            >
              Admin
            </span>
          )}
        </div>

        {/* Actions */}
        <button
          onClick={onLogout}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
