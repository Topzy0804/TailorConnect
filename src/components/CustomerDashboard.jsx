import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { useApp } from "../context";
import { CustomerOrder } from "./customerOrder";
import { useEffect, useState } from "react";
import { getRows } from "../utils/db";
import { Query } from "appwrite";
import { useUser } from "../auth/userContext";

export const CustomerDashboard = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setCurrentView, setSelectedTailorId } = useApp();

  useEffect(() => {
    if (user?.$id) {

      fetchOrderStates();
    }
  }, [user?.$id]);

  const fetchOrderStates = async () => {
    if (!user?.$id) return;

    setLoading(true);
    try {
      // Use the correct env var (confirm this name in your .env)
      const response = await getRows(
        import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS,
        [
          Query.equal("CustomerId", user.$id),
        ]
      );

      const fetchedOrders = response?.rows ?? response?.documents ?? [];
      setOrders(fetchedOrders);

      const totalOrders = fetchedOrders.length;
      const inProgressOrders = fetchedOrders.filter(
        (o) => o?.status === "in_progress"
      ).length;
      const completedOrders = fetchedOrders.filter(
        (o) => o?.status === "completed"
      ).length;

      // Sum raw amounts (assume amounts are stored in cents)
      const totalAmountCents = fetchedOrders.reduce(
        (sum, o) => sum + Number(o?.totalAmount ?? o?.total ?? 0),
        0
      );

      setTotalOrder(totalOrders);
      setInProgress(inProgressOrders);
      setCompleted(completedOrders);
      setTotalSpent(totalAmountCents); // keep cents in state
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load orders. Check console for details.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-emerald-50 text-lg">
            Track your orders and manage your purchases
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Total Orders
              </span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalOrder}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                In Progress
              </span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{inProgress}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Completed
              </span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{completed}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Total Spent
              </span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${(totalSpent / 1).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          </div>

          {/* Pass orders to CustomerOrder (adjust if CustomerOrder fetches itself) */}
          <CustomerOrder orders={orders} />
        </div>
      </div>
    </div>
  );
};
