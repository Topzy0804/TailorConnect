const CartItem = ({ designs = [], handleQuantityUpdate, handleRemoveItem }) => {
  const formatPrice = (v) => `$${Number(v || 0).toFixed(2)}`;

  return (
    <>
      {designs.map((item) => (
        <div key={item.$id} className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src={item.imgURL || item.image || ""} alt={item.name} />
          </div>
          <div className="flex-1">
            <div className="text-black m-1">{item.name}</div>
            <div className="text-emerald-600">{formatPrice(item.price)}</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 border bg-transparent  cursor-pointer flex items-center justify-center transition-variables duration-200 ease-in-out"
              onClick={() =>
                handleQuantityUpdate(item.$id, (item.quantity || 1) - 1)
              }
            >
              -
            </button>
            <span className="quantity">{item.quantity || 1}</span>
            <button
              className="w-8 h-8 border bg-transparent  cursor-pointer flex items-center justify-center transition-variables duration-200 ease-in-out"
              onClick={() =>
                handleQuantityUpdate(item.$id, (item.quantity || 1) + 1)
              }
            >
              +
            </button>
            <button
              className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer"
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
