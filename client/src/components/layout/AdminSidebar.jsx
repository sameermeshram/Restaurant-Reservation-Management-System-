import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard", label: "Overview", icon: "insights" },
  {
    to: "/admin/reservations",
    label: "Reservations",
    icon: "event_available",
  },
  { to: "/admin/tables", label: "Tables", icon: "grid_view" },
  { to: "/admin/dashboard", label: "Analytics", icon: "monitoring" },
  { to: "/admin/dashboard", label: "Settings", icon: "settings" },
];

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 h-screen w-72 flex flex-col p-md space-y-1 bg-inverse-surface shadow-xl z-40">
      <div className="px-4 py-6 mb-8">
        <span className="text-headline-sm font-headline-sm font-bold text-white">
          DineMaster Pro
        </span>
        <p className="text-label-md font-label-md text-surface-variant/70 mt-1">
          Admin Panel
        </p>
      </div>
      <nav className="flex-grow space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? "bg-primary-container text-on-primary-container rounded-lg shadow-sm font-bold scale-98"
                  : "text-surface-variant hover:text-white hover:bg-surface-variant/10"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-label-md font-label-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8 border-t border-surface-variant/20">
        <a
          className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-white hover:bg-surface-variant/10 rounded-lg transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-md font-label-md">Logout</span>
        </a>
      </div>
    </aside>
  );
}

export default AdminSidebar;
