import React, { useState } from "react";
import {
  Scissors,
  Menu,
  X,
  Search,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { useApp } from "../context";
// import { account } from "../lib/appwrite";
import { useUser } from "../auth/userContext";

export const Navbar = ({ onToggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  const { user: currentUser, setUser } = useUser() ?? {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const handleLogout = async () => {
  //   try {
  //     await account.deleteSession("current");
  //   } catch (e) {
  //     /* ignore errors */
  //   }
  //   if (typeof setUser === "function") setUser(null);
  //   navigate("/login");
  // };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle sidebar"
              className="mr-3 p-2 rounded-md text-gray-600 hover:text-emerald-600"
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

          <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-sm tracking-wide hover:text-gray-600">
              HOME
            </Link>
            <Link to="/shop" className="text-sm tracking-wide hover:text-gray-600">
              SHOP
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="p-2 hover:bg-gray-50 rounded-lg"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="p-2 hover:bg-gray-50 rounded-lg"
              aria-label="Cart"
              // onClick={() => navigate("/checkout")}
            >
            <Link to="/cart">
              <ShoppingBag size={20} />
            </Link>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>{currentUser?.name ?? currentUser?.email}</span>
                  </button>
                  {/* <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-red-50"
                  >
                    Sign out
                  </button> */}
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-emerald-600 hover:underline flex items-center gap-2"
                >
                  <UserIcon className="w-5 h-5" /> Sign in
                </Link>
              )}
            </div>

            {/* <button
              className="lg:hidden p-2 ml-2 rounded-md text-gray-600 hover:text-emerald-600"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button> */}
          </div>
        </div>

        {/* {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link to="#men" className="block text-sm text-gray-700">
                MEN
              </Link>
              <Link to="#women" className="block text-sm text-gray-700">
                WOMEN
              </Link>
              <Link to="#kids" className="block text-sm text-gray-700">
                KIDS
              </Link>
              <Link to="#new" className="block text-sm text-gray-700">
                NEW ARRIVALS
              </Link>

              <div className="pt-2 border-t mt-2">
                {currentUser ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-gray-700"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link to="/login" className="block text-sm text-emerald-600">
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Navbar;
