import { Scissors, Users, MessageCircle, Star, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Connecting Artisans with Style Seekers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Perfect Fit,<br />
            <span className="text-emerald-600">Handcrafted by Masters</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover talented tailors, explore unique designs, and get custom clothing made just for you. From traditional to contemporary, find your style.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentView('browse')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Browse Tailors
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border border-gray-200">
              How It Works
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Find Expert Tailors</h3>
            <p className="text-gray-600 leading-relaxed">
              Browse profiles of skilled tailors from around the world. View their portfolios, specialties, and customer reviews.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <MessageCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Communication</h3>
            <p className="text-gray-600 leading-relaxed">
              Chat directly with tailors to discuss your vision, share measurements, and get personalized recommendations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <Scissors className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Creation</h3>
            <p className="text-gray-600 leading-relaxed">
              Get clothing tailored to your exact measurements and style preferences. Every piece is unique and made for you.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white my-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">For Talented Tailors</h2>
              <p className="text-emerald-50 text-lg mb-6 leading-relaxed">
                Showcase your skills, reach new customers, and grow your business. Join our community of master craftspeople.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  <span>Build your reputation with reviews</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>Manage orders efficiently</span>
                </li>
              </ul>
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
                Start Selling Today
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                <Scissors className="w-32 h-32 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <div className="flex justify-center items-center gap-12 mt-8">
            <div>
              <div className="text-4xl font-bold text-emerald-600">1,200+</div>
              <div className="text-gray-600 mt-1">Expert Tailors</div>
            </div>
            <div className="h-16 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">15,000+</div>
              <div className="text-gray-600 mt-1">Happy Customers</div>
            </div>
            <div className="h-16 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">50,000+</div>
              <div className="text-gray-600 mt-1">Orders Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
