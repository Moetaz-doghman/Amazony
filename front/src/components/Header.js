import React from "react";

const Header = () => {
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
              <a href="index.html" className="logo">
                <img
                  src="assets/images/logo.png"
                  alt="Molla Logo"
                  width="105"
                  height="25"
                />
              </a>
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
                  <span className="cart-count">2</span>
                </a>

                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-cart-products">
                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Beige knitted elastic runner shoes
                          </a>
                        </h4>

                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $84.00
                        </span>
                      </div>

                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-1.jpg"
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

                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Blue utility pinafore denim dress
                          </a>
                        </h4>

                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $76.00
                        </span>
                      </div>

                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-2.jpg"
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
                  </div>

                  <div className="dropdown-cart-total">
                    <span>Total</span>

                    <span className="cart-total-price">$160.00</span>
                  </div>

                  <div className="dropdown-cart-action">
                    <a href="cart.html" className="btn btn-primary">
                      View Cart
                    </a>
                    <a
                      href="checkout.html"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right"></i>
                    </a>
                  </div>
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
