import { Scissors, User, MessageSquare, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { setCurrentView, userType, setUserType } = useApp();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <Scissors className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">TailorHub</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('browse')}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Browse Tailors
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView(userType === 'customer' ? 'customer-dashboard' : 'tailor-dashboard')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 border-l pl-6">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'customer' | 'tailor')}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="customer">Customer</option>
                <option value="tailor">Tailor</option>
              </select>
              <button className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
