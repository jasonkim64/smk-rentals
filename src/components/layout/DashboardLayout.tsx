import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Fleet Cars", href: "/fleet" },
  { label: "Bookings", href: "/bookings" },
  { label: "Expenses", href: "/expenses" },
  { label: "Payments", href: "/payments" },
  { label: "Reports", href: "/reports" },
  { label: "List Your Car", href: "/upload" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">SMK Rentals</h1>
          <button 
            className="md:hidden p-2 border border-background rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm">Welcome, Samuel Kiama</span>
            <button className="px-3 py-1 border border-background rounded text-sm">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-48 bg-muted p-4`}>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block p-2 rounded ${
                  location.pathname === item.href
                    ? "bg-foreground text-background"
                    : "hover:bg-border"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-border md:hidden">
            <p className="text-sm">Welcome, Samuel Kiama</p>
            <button className="mt-2 px-3 py-1 border border-foreground rounded text-sm">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
