import React, { createContext, useContext, useState } from "react";

// Créez un contexte initial
const CartContext = createContext();

// Créez un fournisseur pour le contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    // Vérifiez d'abord si le produit est déjà dans le panier
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si le produit existe déjà dans le panier, incrémente la quantité_demande
      if (existingProduct.quantite_demande < existingProduct.quantite) {
        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantite_demande: item.quantite_demande + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        // Vous pouvez afficher une notification ici pour informer que la quantité maximale a été atteinte
        console.log("La quantité maximale est atteinte pour ce produit");
      }
    } else {
      // Si le produit n'existe pas encore dans le panier, l'ajoute avec quantite_demande à 1
      setCart([...cart, { ...product, quantite_demande: 1 }]);
    }
  };

  // Fonction pour diminuer la quantité d'un produit dans le panier
  const decreaseFromCart = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId && item.quantite_demande > 1) {
          return { ...item, quantite_demande: item.quantite_demande - 1 };
        }
        return item;
      })
      .filter((item) => item.quantite_demande > 0); // Supprimer les produits avec quantité_demande de 0

    setCart(updatedCart);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Un hook pour utiliser le contexte du panier dans un composant
export const useCart = () => {
  return useContext(CartContext);
};
