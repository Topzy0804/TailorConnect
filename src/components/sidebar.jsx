import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context";
import { useUser } from "../auth/userContext";
import { account } from "../lib/appwrite";

// accept open and setOpen from parent (App) so Navbar can toggle directly
export const Sidebar = ({ open = true, setOpen = () => {} }) => {
  const navigate = useNavigate();

  // call hooks normally (app should wrap with provider)
  const app = useApp();
  const userContext = useUser();
  const { user, setUser } = userContext ?? {};
  // prefer authenticated user's role, fall back to app context, then default to "customer"
  const userRole = user?.role ?? app?.userRole ?? "customer";

  // removed window event listener — parent now controls open state
  const dashboardPath =
    userRole === "tailor" ? "/tailor-dashboard" : "/customer-dashboard";

  const handleLogout = async () => {
    await account.deleteSession({
      sessionId: "current",
    });
    setUser(null);
    navigate("/login");
  };

  // When closed render only a compact open-button; when open render full sidebar.
  if (!open) {
    return (
      <div>
        {/* small fixed open button — triggers parent setter to show sidebar */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          className="fixed left-2 top-1/2 z-50 -translate-y-1/2 p-2 bg-white rounded shadow hover:bg-emerald-50"
        >
          <svg
            className="w-5 h-5 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <aside
      className={`fixed h-[calc(100vh)] inset-y-0 left-0 z-40 w-64 bg-white border-r md:top-0`}
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
            <span className="text-lg font-semibold text-gray-900">
              TailorConnect
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-emerald-600 p-1 rounded"
            aria-label="Collapse sidebar"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-emerald-50 text-gray-700 lg:hidden"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" />
                </svg>
                <span>Home</span>
              </Link>
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
                <span>Dashboard</span>
              </Link>
            </li>

            {userRole !== "tailor" && (
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
                  <span>Browse Tailors</span>
                </Link>
              </li>
            )}

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
                <span>Messages</span>
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
                <span>Profile</span>
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
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="px-3 py-4 border-t">
          <button
            onClick={() => handleLogout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
