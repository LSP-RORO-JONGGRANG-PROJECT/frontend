"use client";

import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  slug: string;
  description: string;
}

interface ShoppingCartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
