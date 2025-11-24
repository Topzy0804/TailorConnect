import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context";
import { useUser } from "../auth/userContext";

export const Sidebar = ({ className = "" }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // call hooks normally (app should wrap with provider)
  const app = useApp();
  const userData = useUser();
  const currentUser = userData?.user ?? null;
  const setUser = userData?.setUser;
  const userType = app?.userType ?? "customer";

  // listen for the navbar hamburger toggle
  useEffect(() => {
    const handler = () => setOpen((s) => !s);
    window.addEventListener("toggleSidebar", handler);
    return () => window.removeEventListener("toggleSidebar", handler);
  }, []);

  const dashboardPath =
    userType === "tailor" ? "/tailor-dashboard" : "/customer-dashboard";

  const handleLogout = async () => {
    // Clear local user state if provider is available
    if (typeof setUser === "function") {
      try {
        setUser(null);
      } catch (err) {
        console.warn("setUser failed", err);
      }
    }
    // navigate to login page
    navigate("/login");
  };

  return (
    <aside
      className={`bg-white border-r h-full ${className} ${
        open ? "block" : "hidden"
      } md:block`}
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88"></path>
              <path d="M14.47 14.48L20 20"></path>
            </svg>
            {open && (
              <span className="text-lg font-semibold text-gray-900">
                TailorConnect
              </span>
            )}
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            className="text-gray-500 hover:text-emerald-600 p-1 rounded"
            aria-pressed={open}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {open ? (
                <path
                  d="M6 9l6 6 6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M18 15l-6-6-6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to={dashboardPath}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                {open && <span>Dashboard</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/browse"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
                </svg>
                {open && <span>Browse Tailors</span>}
              </Link>
            </li>

            {/* <li>
              <Link
                to="/orders"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h8.99l1.2 3H8.53l-1.37-1zM6 6h15l-1.1 3H8.2L6 6z" />
                </svg>
                {open && <span>Orders</span>}
              </Link>
            </li> */}

            <li>
              <Link
                to="/chat"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 6h-2v9H7v2a1 1 0 0 1-1 1H3l4-5h11a1 1 0 0 0 1-1V6zM17 2H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2v3l4-3h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                </svg>
                {open && <span>Messages</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 3.6-8 8h2c0-3.3 2.7-6 6-6s6 2.7 6 6h2c0-4.4-3.6-8-8-8z" />
                </svg>
                {open && <span>Profile</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.4 12.9a7.4 7.4 0 0 0 0-1.8l2.1-1.6-2-3.5-2.5.9a7.1 7.1 0 0 0-1.5-.9L15 2h-6l-.5 2.1c-.5.2-1 .5-1.5.9L4.5 4.1 2.5 7.6 4.6 9.2a7.4 7.4 0 0 0 0 1.8L2.5 12.6l2 3.5 2.5-.9c.5.3 1 .6 1.5.9L9 22h6l.5-2.1c.5-.2 1-.5 1.5-.9l2.5.9 2-3.5-2.1-1.6zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" />
                </svg>
                {open && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="px-3 py-4 border-t">
          <button
            onClick={currentUser ? handleLogout : () => navigate("/login")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
              currentUser
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-white text-gray-800 border"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            </svg>
            {open && <span>{currentUser ? "Sign out" : "Sign in"}</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
