import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react'; // Added useEffect import
import { useApp } from '../context';
import { getRows } from '../utils/db';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const { setCurrentView, selectedDesignId, selectedTailorId } = useApp();
  const navigate = useNavigate();
  
  const [design, setDesign] = useState(null);
  const [tailor, setTailor] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Form State
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    length: '',
    sleeve: '',
  });
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Fetch Data from Appwrite
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        
        // Fetch Design
        const designRes = await getRows(import.meta.env.VITE_APPWRITE_TABLE_ID_DESIGNS);
        const designs = designRes?.rows ?? designRes?.documents ?? [];
        const foundDesign = designs.find(d => d.$id === selectedDesignId);
        setDesign(foundDesign);

        // Fetch Tailor (either from design or selectedTailorId)
        const targetTailorId = foundDesign?.tailorId || selectedTailorId;
        if (targetTailorId) {
          const tailorRes = await getRows(import.meta.env.VITE_APPWRITE_TABLE_ID_TAILORS);
          const tailors = tailorRes?.rows ?? tailorRes?.documents ?? [];
          setTailor(tailors.find(t => t.$id === targetTailorId));
        }
      } catch (err) {
        console.error("Failed to fetch checkout data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [selectedDesignId, selectedTailorId]);

  const handlePlaceOrder = () => {
    // Integrate your createRows call here for real order placement
    alert('Order placed successfully!');
    navigate('/customer-dashboard');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!design && !tailor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Invalid order session</p>
          <button onClick={() => navigate('/browse')} className="text-emerald-600 underline">Return to Browse</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
              {design ? (
                <div className="flex gap-4 mb-6">
                  <img
                    src={design.imgURL || design.images?.[0]}
                    alt={design.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{design.title || design.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{design.description}</p>
                    <span className="text-xl font-bold text-emerald-600">
                      ${Number(design.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
                  <h3 className="text-lg font-bold text-emerald-900">Custom Order Request</h3>
                  <p className="text-emerald-700 text-sm">Collaborating with {tailor?.name}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tailor Information</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {tailor?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tailor?.name}</p>
                    <p className="text-sm text-gray-600">{tailor?.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurements Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Measurements (Inches)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(measurements).map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{key}</label>
                    <input
                      type="number"
                      value={measurements[key]}
                      onChange={(e) => setMeasurements({...measurements, [key]: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg h-24 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g., Slim fit, add extra pockets..."
                />
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Price</span>
                  <span>${design ? Number(design.price).toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (3%)</span>
                  <span>${design ? (design.price * 0.03).toFixed(2) : '0.00'}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">
                    ${design ? (design.price * 1.03).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};