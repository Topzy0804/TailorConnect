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
import { mockOrders, mockDesigns } from "../data";
import AddCloth from "./tailorModal/addCloth";
import { tablesDB } from "../lib/appwrite";
import { useUser } from "../auth/userContext"; // added

export const TailorDashboard = () => {
  const {user} = useUser();
  const [activeTab, setActiveTab] = useState("orders");
  const [statusFilter, setStatusFilter] = useState("");
  const tailorOrders = mockOrders.filter((o) => o.tailorId === "1");
  const tailorDesigns = mockDesigns.filter((d) => d.tailorId === "1");
  const totalRevenue = tailorOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrders = tailorOrders.filter(
    (o) => o.status === "pending" || o.status === "in_progress"
  ).length;

  const [isAddClothOpen, setIsAddClothOpen] = useState(false);

  const handleAddClothClose = () => setIsAddClothOpen(false);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">
            {`Welcome ${user?.name}`}
          </h1>
          <p className="text-emerald-50 text-lg">
            
            Dashboard
          </p>
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
              ${(totalRevenue / 100).toFixed(2)}
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
                  const design = order.designId
                    ? mockDesigns.find((d) => d.id === order.designId)
                    : null;

                  return (
                    <div
                      key={order.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {design ? (
                              <img
                                src={design.images[0]}
                                alt={design.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {design ? design.title : "Custom Order"}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              Order #{order.id} •{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            {order.isCustom && order.measurements && (
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">
                                  Measurements:
                                </span>{" "}
                                {Object.entries(order.measurements)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(", ")}
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <select
                                value={order.status}
                                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <span className="text-xl font-bold text-gray-900">
                                ${(order.totalAmount / 100).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    //tailor
                  );
                })
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 p-6">
              {tailorDesigns.map((design) => (
                <div
                  key={design.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={design.images[0]}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {design.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${(design.price / 100).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {design.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* render modal when open */}
      {isAddClothOpen && (
        <AddCloth onClose={handleAddClothClose} initialMode="design" />
      )}
    </div>
  );
};
