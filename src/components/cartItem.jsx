import React from "react";

const CartItem = ({ designs = [], handleQuantityUpdate, handleRemoveItem }) => {
  const formatPrice = (v) => `$${Number(v || 0).toFixed(2)}`;

  return (
    <div className="space-y-3">
      {designs.map((item) => (
        <div 
          key={item.cartItemId || item.$id} 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-100 bg-white rounded-lg shadow-sm"
        >
          {/* Image and Info Section */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
              <img 
                src={item.image || item.imgURL || "https://via.placeholder.com/150"} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 font-bold truncate">{item.name}</div>
              <div className="text-emerald-600 font-semibold mb-1">{formatPrice(item.price)}</div>
              
              {/* sizeand color selections */}
              <div className="flex flex-wrap gap-2">
                {item.selectedSize && (
                  <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold border border-gray-200">
                    Size: {item.selectedSize}
                  </span>
                )}
                {item.selectedColor && (
                  <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold border border-gray-200">
                    Color: {item.selectedColor}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 border rounded-md bg-white hover:bg-gray-100 flex items-center justify-center transition-colors font-bold"
                onClick={() => handleQuantityUpdate(item.cartItemId || item.$id, (item.quantity || 1) - 1)}
              >
                -
              </button>
              <span className="font-semibold text-gray-800 min-w-[20px] text-center">{item.quantity || 1}</span>
              <button
                className="w-8 h-8 border rounded-md bg-white hover:bg-gray-100 flex items-center justify-center transition-colors font-bold"
                onClick={() => handleQuantityUpdate(item.cartItemId || item.$id, (item.quantity || 1) + 1)}
              >
                +
              </button>
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
              onClick={() => handleRemoveItem(item.cartItemId || item.$id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;