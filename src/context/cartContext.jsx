import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (s, it) => s + (Number(it.price) || 0) * (it.quantity || 1),
        0
      ),
    [cartItems]
  );
  
  const formatPrice = useCallback((v) => `$${Number(v || 0).toFixed(2)}`, []);

  const addToCart = useCallback((itemData) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.$id === itemData.$id);

      if (existingItem) {
        // Item exists, increment quantity
        return prevItems.map((item) =>
          item.$id === itemData.$id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Item is new, add it with quantity: 1
        return [...prevItems, { ...itemData, quantity: 1 }];
      }
    });
  }, []);

  // Function to update item quantity (used from the Cart component)
  const handleQuantityUpdate = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity is 0, remove the item
      setCartItems((prev) => prev.filter((it) => it.$id !== itemId));
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.$id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Function to remove an item completely
  const handleRemoveItem = useCallback((id) =>
    setCartItems((prev) => prev.filter((it) => it.$id !== id)),
    []
  );
  
  // Function to clear the entire cart
  const clearCart = useCallback(() => setCartItems([]), []);

  const cartValue = useMemo(() => ({
    cartItems,
    total,
    formatPrice,
    addToCart,
    handleQuantityUpdate,
    handleRemoveItem,
    clearCart,
  }), [cartItems, total, formatPrice, addToCart, handleQuantityUpdate, handleRemoveItem, clearCart]);

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};