import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/my-reservations", label: "My Reservations", icon: "calendar_month" },
  {
    to: "/new-reservation",
    label: "Create Reservation",
    icon: "add_circle",
  },
  { to: "/dashboard", label: "Profile", icon: "person" },
];

function CustomerSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col p-md h-screen w-72 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant shadow-md z-40">
      <div className="mb-xl px-2">
        <span className="text-headline-sm font-headline-sm font-black text-primary">
          DineMaster Pro
        </span>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1 duration-200"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
            JD
          </div>
          <div>
            <p className="text-label-md font-bold text-on-surface">
              Guest User
            </p>
            <p className="text-body-sm text-on-surface-variant">
              Customer Portal
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:translate-x-1 duration-200 rounded-lg"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </Link>
      </div>
    </aside>
  );
}

export default CustomerSidebar;
