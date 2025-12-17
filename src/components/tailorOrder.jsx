import React, { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { getRows } from "../utils/db";
import { Query } from "appwrite";
import { useUser } from "../auth/userContext";

export const TailorOrder = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.$id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getRows(
          import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS
        );
        const rows = response?.rows ?? response?.documents ?? response ?? [];
        setOrders(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.$id]);

  const handleStatusChange = (orderId, newStatus) => {
    // Here you would typically call an Appwrite function to update the order status
    console.log(`Updating order ${orderId} to ${newStatus}`);
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.$id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-700" />;
      case "in_progress":
        return <Package className="w-4 h-4 text-blue-700" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-700" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-700" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your orders...</div>;
  }

  if (error) {
    return (
      <div className="p-6 m-4 bg-red-50 text-red-700 rounded-lg">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-12 text-center text-gray-600">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {orders.map((order) => {
        const design = order.design || {}; // Assuming design is nested in order
        const imageSrc =
          design.imageURL ??
          design.images?.[0] ??
          order.imageURL ??
          `https://via.placeholder.com/150?text=No+Image`;
        const designTitle = design.title ?? order.designTitle ?? "Custom Order";
        const orderDate = order.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "N/A";
        const totalAmount = Number(order.totalAmount || 0);
        const displayAmount =
          totalAmount > 1000 ? totalAmount / 100 : totalAmount;

        return (
          <div
            key={order.$id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={imageSrc}
                    alt={designTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {designTitle}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Order #{order.$id.slice(-6)} • {orderDate}
                  </p>
                  {order.isCustom && order.measurements && (
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Measurements:</span>{" "}
                      {Object.entries(order.measurements)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {getStatusIcon(order.status)}
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.$id, e.target.value)
                        }
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pl-9 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      ${displayAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
