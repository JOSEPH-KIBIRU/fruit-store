import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fruitStoreCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('fruitStoreCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fruitStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (fruit) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === fruit.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === fruit.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...fruit, quantity: 1 }];
      }

      return newItems;
    });
  };

  const removeFromCart = (fruitId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== fruitId));
  };

  const updateQuantity = (fruitId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(fruitId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === fruitId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (fruitId) => {
    const item = cartItems.find(item => item.id === fruitId);
    return item ? item.quantity : 0;
  };

  const isInCart = (fruitId) => {
    return cartItems.some(item => item.id === fruitId);
  };

  const applyDiscount = (discountPercentage) => {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    
    const discountMultiplier = (100 - discountPercentage) / 100;
    return getTotalPrice() * discountMultiplier;
  };

  const getCartSummary = () => {
    return {
      totalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        image: item.image_url
      }))
    };
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemQuantity,
    isInCart,
    applyDiscount,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}