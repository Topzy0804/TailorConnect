import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { mockDesigns, mockTailors } from '../data';
import { useApp } from '../context';

export const Checkout = () => {
  const { setCurrentView, selectedDesignId, selectedTailorId } = useApp();
  const [customOrder, setCustomOrder] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    length: '',
    sleeve: '',
  });
  const [specialInstructions, setSpecialInstructions] = useState('');

  const design = mockDesigns.find((d) => d.id === selectedDesignId);
  const tailor = mockTailors.find((t) => t.id === (design?.tailorId || selectedTailorId));

  if (!design && !tailor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Invalid order</p>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    alert('Order placed successfully! This would integrate with payment processing.');
    setCurrentView('customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentView(design ? 'tailor-profile' : 'browse')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>

              {design ? (
                <div className="flex gap-4 mb-6">
                  <img
                    src={design.images[0]}
                    alt={design.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{design.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{design.description}</p>
                    <span className="text-xl font-bold text-emerald-600">
                      ${(design.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Custom Order</h3>
                  <p className="text-gray-600 text-sm">
                    Work with {tailor?.name} to create a custom design
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tailor Information</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={tailor?.avatar}
                    alt={tailor?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{tailor?.name}</p>
                    <p className="text-sm text-gray-600">{tailor?.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Measurements</h2>
              <p className="text-gray-600 text-sm mb-4">
                Please provide your measurements for the perfect fit. All measurements should be in inches.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chest
                  </label>
                  <input
                    type="text"
                    value={measurements.chest}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, chest: e.target.value })
                    }
                    placeholder='e.g., 38"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waist
                  </label>
                  <input
                    type="text"
                    value={measurements.waist}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, waist: e.target.value })
                    }
                    placeholder='e.g., 32"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hips
                  </label>
                  <input
                    type="text"
                    value={measurements.hips}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, hips: e.target.value })
                    }
                    placeholder='e.g., 40"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length
                  </label>
                  <input
                    type="text"
                    value={measurements.length}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, length: e.target.value })
                    }
                    placeholder='e.g., 42"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sleeve
                  </label>
                  <input
                    type="text"
                    value={measurements.sleeve}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, sleeve: e.target.value })
                    }
                    placeholder='e.g., 24"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or details the tailor should know..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>

              <div className="space-y-3">
                <div className="border-2 border-emerald-600 rounded-lg p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Credit / Debit Card</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${design ? (design.price / 100).toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Processing Fee</span>
                  <span>${design ? ((design.price * 0.03) / 100).toFixed(2) : '0.00'}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>
                    ${design ? ((design.price * 1.03) / 100).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Place Order
              </button>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Secure payment processing
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Direct communication with tailor
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Quality guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
