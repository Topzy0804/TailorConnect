import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Calendar, DollarSign, Tag, ArrowLeft, CheckCircle } from "lucide-react";
import { getRows } from "../utils/db"; // Using your existing db utility

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetching specific order by ID from your Orders table
        const response = await getRows(
          import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS,
          [] 
        );
        // Find the specific order in the returned rows
        const rows = response?.rows ?? response?.documents ?? [];
        const foundOrder = rows.find(o => o.$id === id);
        setOrder(foundOrder);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading order details...</div>;
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  // Parsing items which were stored as JSON strings in cart.jsx
  const items = order.items ? order.items.map(item => JSON.parse(item)) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition"
        >
          <ArrowLeft size={20} /> Back to Orders
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-emerald-600 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-emerald-100 text-sm uppercase tracking-wider font-semibold">Order ID</p>
                <h1 className="text-2xl font-bold">#{order.$id}</h1>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                <CheckCircle size={18} />
                <span className="capitalize font-medium">{order.status || "Pending"}</span>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
            {/* Order Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" /> Order Summary
              </h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Date: <span className="text-gray-900 font-medium">{new Date(order.$createdAt).toLocaleDateString()}</span></p>
                <p>Total Items: <span className="text-gray-900 font-medium">{order.itemsCount || items.length}</span></p>
                <p>Status: <span className="text-emerald-600 font-medium capitalize">{order.status}</span></p>
              </div>
            </div>

            {/* Price Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-600" /> Payment Details
              </h2>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-800">Total Amount Paid</p>
                <p className="text-3xl font-bold text-emerald-700">${Number(order.totalAmount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={18} className="text-emerald-600" /> Items Purchased
            </h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <img src={item.imgURL} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}