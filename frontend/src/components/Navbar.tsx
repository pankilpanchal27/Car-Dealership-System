interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

/**
 * Top navigation bar — shows branding, admin badge, and logout button.
 */
export default function Navbar({ isAdmin, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#04060d]/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-sm shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            🚗
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            Car Dealership
          </span>
          {isAdmin && (
            <span
              data-testid="admin-badge"
              className="ml-2 rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400 ring-1 ring-indigo-500/40"
            >
              Admin
            </span>
          )}
        </div>

        {/* Actions */}
        <button
          onClick={onLogout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
