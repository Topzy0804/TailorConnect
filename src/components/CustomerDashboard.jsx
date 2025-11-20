import { Package, Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { mockOrders, mockTailors, mockDesigns } from '../data';
import { useApp } from '../context';

export const CustomerDashboard = () => {
  const { setCurrentView, setSelectedTailorId } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <Package className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

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
              <span className="text-gray-600 text-sm font-medium">Total Orders</span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockOrders.length}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">In Progress</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {mockOrders.filter((o) => o.status === 'in_progress').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {mockOrders.filter((o) => o.status === 'completed').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Spent</span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${(mockOrders.reduce((sum, o) => sum + o.totalAmount, 0) / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {mockOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No orders yet</p>
                <button
                  onClick={() => setCurrentView('browse')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Browse Tailors
                </button>
              </div>
            ) : (
              mockOrders.map((order) => {
                const tailor = mockTailors.find((t) => t.id === order.tailorId);
                const design = order.designId
                  ? mockDesigns.find((d) => d.id === order.designId)
                  : null;

                return (
                  <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {design ? (
                            <img
                              src={design.images[0]}
                              alt={design.title}
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
                                {design ? design.title : 'Custom Order'}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                by {tailor?.name}
                              </p>
                            </div>
                            <span
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <span>Order #{order.id}</span>
                            <span>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            {order.isCustom && (
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                                Custom
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                              ${(order.totalAmount / 100).toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedTailorId(order.tailorId);
                                  setCurrentView('chat');
                                }}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
                                Chat
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTailorId(order.tailorId);
                                  setCurrentView('tailor-profile');
                                }}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                              >
                                View Tailor
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
