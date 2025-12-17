const CartItem = ({ designs = [], handleQuantityUpdate, handleRemoveItem }) => {
  const formatPrice = (v) => `$${Number(v || 0).toFixed(2)}`;

  return (
    <>
      {designs.map((item) => (
        <div 
          key={item.$id} 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-gray-200 bg-white rounded-lg mb-2"
        >
          {/* Image and Info Section */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img 
                src={item.imgURL || item.image || ""} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-black font-medium truncate">{item.name}</div>
              <div className="text-emerald-600 font-semibold">{formatPrice(item.price)}</div>
            </div>
          </div>

          {/* Controls Section - Full width on mobile, auto on desktop */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 border rounded-md bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-center transition-colors"
                onClick={() => handleQuantityUpdate(item.$id, (item.quantity || 1) - 1)}
              >
                -
              </button>
              <span className="font-medium min-w-[20px] text-center">{item.quantity || 1}</span>
              <button
                className="w-8 h-8 border rounded-md bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-center transition-colors"
                onClick={() => handleQuantityUpdate(item.$id, (item.quantity || 1) + 1)}
              >
                +
              </button>
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1"
              onClick={() => handleRemoveItem(item.$id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;