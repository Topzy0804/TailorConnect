import React, { useEffect, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { useApp } from "../context";
import { useNavigate } from "react-router-dom";
import { getRows } from "../utils/db";

export const CustomerOrder = () => {
  const { setSelectedTailorId, setCurrentView } = useApp() || {};
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getRows(
          import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS,
          []
        );
        const rows = response?.rows ?? response?.documents ?? response ?? [];
        if (mounted) setOrders(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      mounted = false;
    };
  }, []);

  const getStatusColor = (status) => {
    switch ((status || "").toString()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in_progress":
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
      case "done":
        return "bg-green-100 text-green-700";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toString()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
      case "in-progress":
        return <Package className="w-4 h-4" />;
      case "completed":
      case "done":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
      case "canceled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Failed to load orders. Check console for details.
      </div>
    );
  if (!orders.length)
    return (
      <div className="p-12 text-center text-gray-600">No orders found.</div>
    );

  return (
    <div className="divide-y divide-gray-200">
      {orders.map((order) => {
        // safe normalization
        const orderId = order?.$id ?? order?.id ?? "";
        const createdRaw =
          order?.createdAt ?? order?.$createdAt ?? order?.created ?? null;
        let createdDate = "N/A";
        try {
          if (createdRaw) {
            const d = new Date(createdRaw);
            createdDate = isNaN(d)
              ? String(createdRaw)
              : d.toLocaleDateString();
          }
        } catch {
          createdDate = String(createdRaw);
        }

        const rawTotal =
          order?.totalAmount ?? order?.total ?? order?.amount ?? 0;
        const totalNumber = Number(rawTotal) || 0;
        const dollars = totalNumber > 1000 ? totalNumber / 100 : totalNumber;

        const imageSrc =
          order?.designImage ??
          order?.imageURL ??
          order?.images?.[0] ??
          order?.design?.images?.[0] ??
          null;

        const tailorName =
          order?.tailorName ?? order?.tailor?.name ?? "Unknown Tailor";
        const designTitle =
          order?.designTitle ?? order?.design?.title ?? "Custom Order";

        return (
          <div
            key={orderId || Math.random()}
            className="p-6 hover:bg-gray-50 transition-colors flex gap-4"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={designTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {designTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">by {tailorName}</p>
                </div>

                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order?.status
                  )}`}
                >
                  {getStatusIcon(order?.status)}
                  <span className="capitalize">
                    {String(order?.status ?? "unknown").replace(/[_-]/g, " ")}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                <span>Order #{orderId || "—"}</span>
                <span>{createdDate}</span>
                {order?.isCustom && (
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                    Custom
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${dollars.toFixed(2)}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const orderId = order.$id ?? order?.id;
                      if (orderId) {

                      navigate(`/order/${orderId}`);
                      }
                    }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    View Order
                  </button>

                  {/* <button
                    onClick={() => {
                      const tid =
                        order?.tailorId ??
                        order?.tailor?.$id ??
                        order?.tailor?.id;
                      if (tid) navigate(`/tailor/${tid}`);
                      else navigate("/tailors");
                    }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    View 
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
