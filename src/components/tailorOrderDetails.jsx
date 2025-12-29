import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRow } from "../utils/db"; // Assuming getRow exists in your db utils
import { ArrowLeft, User, Ruler, Package, Clock } from "lucide-react";
import { updateRow } from "../utils/db"; 

const TailorOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getRow(import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS, id);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading order details...</div>;
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  const items = order.items?.map(item => JSON.parse(item)) || [];

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      await updateRow(import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS, id, { status: newStatus });

      setOrder(prev => ({ ...prev, status: newStatus }));
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Order #{order.$id.slice(-6)}</h2>
            <p className="opacity-90">Placed on {new Date(order.$createdAt).toLocaleDateString()}</p>
          </div>
          <span className="px-4 py-1 bg-white text-emerald-600 rounded-full font-bold uppercase text-sm">
            {order.status}
          </span>
        </div>

        <div className="p-8 space-y-8">
          {/* Customer Info */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold border-b pb-2">
              <User className="w-5 h-5" /> <h3>Customer Details</h3>
            </div>
            <p className="text-gray-800"><strong>Name:</strong> {order.customerName}</p>
            <p className="text-gray-800"><strong>Email:</strong> {order.customerEmail}</p>
          </section>

          {/* Items */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold border-b pb-2">
              <Package className="w-5 h-5" /> <h3>Items Ordered</h3>
            </div>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <img src={item.image} alt="" className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-emerald-600 font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Measurements/Notes */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold border-b pb-2">
              <Ruler className="w-5 h-5" /> <h3>Measurements & Notes</h3>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-amber-900">
              {order.notes || "No special instructions provided."}
            </div>
          </section>

          <div className="pt-6 border-t flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">Total: ${order.totalAmount}</span>
            <select 
               className="border rounded-lg px-4 py-2 bg-white"
               value={order.status}
               onChange={(e) => handleStatusUpdate(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailorOrderDetails;