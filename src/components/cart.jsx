import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard } from "lucide-react";
import CartItem from "./cartItem";
import { useCart } from "../context/cartContext";

export default function Cart() {
  const navigate = useNavigate();
  
  // FIX: Access global state and handlers from the custom hook
  const {
    cartItems,
    total,
    formatPrice,
    handleQuantityUpdate,
    handleRemoveItem,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/shop"
            className="text-emerald-600 font-medium hover:text-emerald-700 transition"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <CartItem
              designs={cartItems} // Now using the global cartItems
              handleQuantityUpdate={handleQuantityUpdate}
              handleRemoveItem={handleRemoveItem}
            />
          </div>

          <aside className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-3 text-gray-800">Order Summary</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(total)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Taxes and shipping calculated at checkout.
            </div>

            <button
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-md hover:bg-emerald-700 transition"
            >
              <CreditCard className="w-4 h-4" /> Checkout
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="w-full mt-3 text-sm text-emerald-600 border border-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50 transition"
            >
              Continue shopping
            </button>
            <button
              onClick={clearCart} // Optional: Added clear cart button for convenience
              className="w-full mt-3 text-sm text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}