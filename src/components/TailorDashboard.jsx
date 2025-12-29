import React, { useState, useEffect } from "react";
import {
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import AddCloth from "./tailorModal/addCloth";
import { useUser } from "../auth/userContext";
import { getRows, deleteRow } from "../utils/db";
import { Query } from "appwrite";
import NewDesign from "./newDesign";
import { useNavigate } from "react-router-dom";

export const TailorDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [tailorOrders, setTailorOrders] = useState([]);
  const [tailorDesigns, setTailorDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const activeOrders = tailorOrders.filter(
    (o) => o.status === "pending" || o.status === "in_progress"
  ).length;
  const [designs, setDesigns] = useState([]);

  const [editDesign, setEditDesign] = useState(null);

  const [isAddClothOpen, setIsAddClothOpen] = useState(false);

  // const handleAddClothClose = () => setIsAddClothOpen(false);

  
    
    const fetchTailorData = async () => {
      if (!user?.$id) return;
      try {
        const response = await getRows(import.meta.env.VITE_APPWRITE_TAILORS_TABLE_ID, [Query.equal("tailorId", user.$id)]);
        setDesigns(response.rows);
        setTailorDesigns(response.rows ?? []);

        const ordersResponse = await getRows(import.meta.env.VITE_APPWRITE_TABLE_ID_ORDERS, [Query.equal("TailorId", user.$id)]);
        console.log("Orders fetched for tailor:", ordersResponse);

        const allOrders = ordersResponse.rows ?? [];

        console.log("All orders fetched:", allOrders);
        console.log("User ID:", user.$id);
        setTailorOrders(allOrders);
          
        

        const revenue = allOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
        setTotalRevenue(revenue);


        console.log("Tailor data fetched:", response.rows);
      } catch (error) {
        console.error("Error fetching tailor data:", error);
      }
    };

   useEffect(() => {
    fetchTailorData();
  }, [user?.$id]
   );

   const handleAddClothClose = (shouldRefresh = true) => {
    setIsAddClothOpen(false);
    setEditDesign(null);
    if (shouldRefresh) {
      fetchTailorData();
    }
   };

   const handleEdit = (design) => {
    setEditDesign(design);
    setIsAddClothOpen(true);
   };

   const handleDelete = async (design) => {
    if (!confirm(`Are you sure you want to delete "${design.title}"?`)) {
      return;
    }
    try {
      await deleteRow(import.meta.env.VITE_APPWRITE_TAILORS_TABLE_ID, design.$id);
      setTailorDesigns((prevDesigns) => prevDesigns.filter((d) => d.$id !== design.$id));
    } catch (error) {
      console.error("Error deleting design:", error);
    }
   };

  const handleStatusChange = (orderId, newStatus) => {
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">{`Welcome ${user?.name}`}</h1>
          <p className="text-emerald-50 text-lg">Dashboard</p>
          {/* <p>{currentUser?.businessName ?? userDetails?.businessName}</p> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Total Revenue
              </span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${(totalRevenue / 1).toFixed(2)}
            </p>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Active Orders
              </span>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeOrders}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Total Designs
              </span>
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {tailorDesigns.length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Total Orders
              </span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {tailorOrders.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-2 font-semibold transition-colors ${
                    activeTab === "orders"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("designs")}
                  className={`px-4 py-2 font-semibold transition-colors ${
                    activeTab === "designs"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Designs
                </button>
              </div>
              {activeTab === "designs" && (
                <button
                  onClick={() => setIsAddClothOpen(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Design
                </button>
              )}
            </div>
          </div>

{activeTab === "orders" ? (
   <div className="divide-y divide-gray-200">
   {tailorOrders.length === 0 ? (
     <div className="p-12 text-center">
       <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
       <p className="text-gray-600">No orders yet</p>
     </div>
   ) : (
     tailorOrders.map((order) => {
       // Parse the first item to get product info
       let firstItem = {};
       try {
         firstItem = order.items?.length > 0 ? JSON.parse(order.items[0]) : {};
       } catch (e) { console.error(e); }

       return (
         <div key={order.$id}
         onClick={() => navigate(`/tailor/order/${order.$id}`)}
          className="p-6 hover:bg-gray-50 transition-colors cursor-pointer border-b last:border-0">

          <div className="flex justify-between items-center">
           <div className="flex gap-4">
             <img 
               src={firstItem.image || "placeholder.png"} 
               className="w-20 h-20 object-cover rounded" 
             />
             <div>
               <h3 className="font-bold">{firstItem.title || "Custom Order"}</h3>
               <p className="text-sm text-gray-500">Order #{order.$id.slice(-6)}</p>
               <p className="text-sm text-emerald-600 font-semibold">${order.totalAmount}</p>
             </div>
           </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
                {order.status}
            </span>
            <p className="text-xs text-gray-400 mt-2">View Details →</p>
        </div>
         </div>
        </div>

       );
     })
   )}
  
   </div>
) : (
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <NewDesign designs={designs}
              onEdit={handleEdit}
              onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>

      {isAddClothOpen && (
        <AddCloth onClose={handleAddClothClose} 
        initialMode="design"
        initialDesignData={editDesign} />
      )}
    </div>
  );
};
