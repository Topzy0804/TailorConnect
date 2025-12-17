import React from "react";
import {
  Scissors,
  Menu,
  Search,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../auth/userContext";
import { useCart } from "../context/useCart";

export const Navbar = ({ onToggleSidebar = () => {} }) => {
  const navigate = useNavigate();
  
  // Safe destructuring with default fallbacks
  const { user: currentUser } = useUser() ?? {};
  const { cartItemCount } = useCart() ?? { cartItemCount: 0 };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: Sidebar Toggle & Logo */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle sidebar"
              className="mr-3 p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              onClick={onToggleSidebar}
            >
              <Menu className="w-6 h-6" />
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

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm tracking-wide hover:text-gray-600">
              HOME
            </Link>
            <Link to="/shop" className="text-sm tracking-wide hover:text-gray-600">
              SHOP
            </Link>
          </nav>

          {/* RIGHT: Icons (Search, Cart, Profile) */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 hover:text-emerald-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart Icon - Added 'relative' for badge positioning */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-50 rounded-lg text-gray-600 hover:text-emerald-600"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>{currentUser?.name ?? currentUser?.email}</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-emerald-600 hover:underline flex items-center gap-2 font-medium"
                >
                  <UserIcon className="w-5 h-5" /> Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;