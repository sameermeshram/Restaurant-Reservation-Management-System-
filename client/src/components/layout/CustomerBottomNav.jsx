import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/dashboard", icon: "home", label: "Home" },
  { to: "/new-reservation", icon: "add_box", label: "Book" },
  { to: "/my-reservations", icon: "confirmation_number", label: "My Trips" },
  { to: "/dashboard", icon: "account_circle", label: "Profile" },
];

function CustomerBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface border-t-none rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {items.map((item) => {
        const active = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center ${active ? "bg-primary-container text-on-primary-container rounded-full px-4 py-1" : "text-on-surface-variant"}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-label-sm font-label-sm-mobile">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default CustomerBottomNav;
