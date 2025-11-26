import { Scissors, User, MessageSquare, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context";
import { account } from "../lib/appwrite";
import { useUser } from "../auth/userContext";

export const Navbar = ({ onToggleSidebar }) => {
  const { userType, setUserType } = useApp();
  const navigate = useNavigate();
  const userData = useUser();
  const setUser = userData?.setUser;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            {/* call the prop instead of dispatching a window event */}
            <button
              aria-label="Toggle sidebar"
              className="mr-3 p-2 rounded-md text-gray-600 hover:text-emerald-600 "
              onClick={onToggleSidebar}
            >
              <svg
                className="w-6 h-6"
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

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Scissors className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">
                TailorHub
              </span>
            </div>
          </div>

          {/* <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/browse")}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Browse Tailors
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                navigate(
                  userType === "customer"
                    ? "/customer-dashboard"
                    : "/tailor-dashboard"
                )
              }
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 border-l pl-6">
              <Link to="/login">Login</Link>
              <button className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
            <div></div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};
