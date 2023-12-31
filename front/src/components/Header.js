import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../contexte/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartDropdownRef = useRef(null);

  // Fonction pour calculer le prix total du panier
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.quantite_demande * product.prix;
    }, 0);
  };

  // Gestionnaire d'événement pour ouvrir le panier
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Gestionnaire d'événement pour fermer le panier
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Gestionnaire d'événement pour fermer le panier lorsque l'utilisateur clique à l'extérieur
  const handleClickOutside = (event) => {
    if (
      cartDropdownRef.current &&
      !cartDropdownRef.current.contains(event.target)
    ) {
      setIsCartOpen(false);
    }
  };

  // Ajoutez un écouteur d'événement de clic lors de l'ouverture du panier
  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-left">
              <div className="header-dropdown">
                <p>
                  Découvrez les meilleures affaires, chaque jour sur Amazony !
                </p>
              </div>
            </div>
            <div className="header-right">
              <ul className="top-menu">
                <li>
                  <ul>
                    <li>
                      <a href="tel:#">
                        <i className="icon-phone"></i>Call: +216 52 46 46 49
                      </a>
                    </li>
                    <li>
                      <a href="mailto:moetaz.doghman@esprit.tn">
                        <i className="icon-envelope"></i>
                        moetaz.doghman@esprit.tn{" "}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="header-middle sticky-header">
          <div className="container">
            <div className="header-left">
              <Link to="/" className="logo">
                <img
                  src="assets/images/logo.png"
                  alt="Molla Logo"
                  width="105"
                  height="25"
                />
              </Link>
            </div>

            <div className="header-right">
              <div className="header-search">
                <a
                  href="ddd"
                  className="search-toggle"
                  role="button"
                  title="Search"
                >
                  <i className="icon-search"></i>
                </a>
                <form action="#" method="get">
                  <div className="header-search-wrapper">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Search in..."
                      required
                    />
                  </div>
                </form>
              </div>

              <div
                className={`dropdown cart-dropdown ${isCartOpen ? "show" : ""}`}
                ref={cartDropdownRef}
              >
                <a
                  href="ddd"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                  onClick={isCartOpen ? closeCart : openCart} // Ouvrir/fermer le panier au clic
                >
                  <i className="icon-shopping-cart"></i>
                  <span className="cart-count">{cart.length}</span>
                </a>

                <div className="dropdown-menu dropdown-menu-right">
                  {cart.length === 0 ? (
                    <p>Votre panier est vide.</p>
                  ) : (
                    <div>
                      <div className="dropdown-cart-products">
                        {cart.map((product) => (
                          <div key={product._id} className="product">
                            <div className="product-cart-details">
                              <h4 className="product-title">
                                <Link to={`/${product._id}`}>
                                  {product.titre}
                                </Link>
                              </h4>

                              <span className="cart-product-info">
                                <span className="cart-product-qty">
                                  {product.quantite_demande}{" "}
                                </span>
                                *{product.prix}DT
                              </span>
                            </div>

                            <figure className="product-image-container">
                              <Link
                                to={`/${product._id}`}
                                className="product-image"
                              >
                                <img
                                  src={product.images[0].secure_url}
                                  alt="product"
                                />
                              </Link>
                            </figure>
                            <button
                              className="btn-remove"
                              title="Remove Product"
                              onClick={() => removeFromCart(product._id)}
                            >
                              <i className="icon-close"></i>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="dropdown-cart-total">
                        <span>Total</span>

                        <span className="cart-total-price">
                          {" "}
                          {calculateTotalPrice()}DT
                        </span>
                      </div>

                      <div className="dropdown-cart-action">
                        <Link to="/cart" className="btn btn-primary">
                          Voir le panier
                        </Link>
                        <Link
                          to="/checkout"
                          className="btn btn-outline-primary-2"
                        >
                          <span>Acheter</span>
                          <i className="icon-long-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
