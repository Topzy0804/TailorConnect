import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/cartContext";

export default function NewDesigns({ designs, onProductClick }) {
  // const [cartItems, setCartItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const {addToCart} = useCart();


  const handleAddToCart = (itemId) => {
    const productData = designs.find((design) => design.$id === itemId);

    if (!productData) {
      console.error("Product not found:", itemId);
      return;
    }

    addToCart({
      $id: productData.$id,
      name: productData.title,
      price: productData.price,
      imgURL: productData.imageURL,
    })
  };

    const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.$id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      {designs.map((design) => (
        <div key={design.$id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
        onClick={() => onProductClick(design.$id)}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={design.imageURL}
              alt={design.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {design.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {design.description}
            </p>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {design.available}
            </p>
            <div>
              <p>{design.sizes.join(", ")}</p>
              <p>{design.colors.join(", ")}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-900">
                ${(design.price / 1).toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">{design.category}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(design.$id)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> Add To Cart
              </button>

              {/* <button
                onClick={() => onDelete?.(design)}
                className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
