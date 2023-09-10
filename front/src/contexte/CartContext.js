import React, { createContext, useContext, useState } from "react";

// Créez un contexte initial
const CartContext = createContext();

// Créez un fournisseur pour le contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Un hook pour utiliser le contexte du panier dans un composant
export const useCart = () => {
  return useContext(CartContext);
};
