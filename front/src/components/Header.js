import React from "react";
import { useCart } from "../contexte/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useCart();

  // Fonction pour calculer le prix total du panier
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.quantite_demande * product.prix;
    }, 0);
  };
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

              <div className="dropdown cart-dropdown">
                <a
                  href="ddd"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
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
                              <a href="product.html" className="product-image">
                                <img
                                  src={product.images[0].secure_url}
                                  alt="product"
                                />
                              </a>
                            </figure>
                            <a
                              href="ddd"
                              className="btn-remove"
                              title="Remove Product"
                            >
                              <i className="icon-close"></i>
                            </a>
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
                          View Cart
                        </Link>
                        <a
                          href="checkout.html"
                          className="btn btn-outline-primary-2"
                        >
                          <span>Checkout</span>
                          <i className="icon-long-arrow-right"></i>
                        </a>
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
