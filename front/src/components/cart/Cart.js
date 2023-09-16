import React from "react";
import { useCart } from "../../contexte/CartContext";
import { Link } from "react-router-dom";


const Cart = () => {
  const { cart, decreaseFromCart, removeFromCart, addToCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.quantite_demande * product.prix + 7,
      0
    );
  };

  const calculateSousTotal = () => {
    return cart.reduce(
      (total, product) => total + product.quantite_demande * product.prix ,
      0
    );
  };

  return (
    <div>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                {cart.length === 0 ? (
                  <p>Votre panier est vide.</p>
                ) : (
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((product) => (
                        <>
                          <tr key={product.id}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <a href="#0">
                                    <img
                                      src={product.images[0].secure_url}
                                      alt="Product "
                                      style={{ width: "60px", height: "60px" }}
                                    />
                                  </a>
                                </figure>

                                <h3 className="product-title">
                                  <a href="#0">{product.titre}</a>
                                </h3>
                              </div>
                            </td>
                            <td className="price-col">{product.prix}DT</td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity">
                                <button
                                  onClick={() => decreaseFromCart(product._id)} // Diminuer la quantité
                                  className="quantity-btn minus"
                                  readOnly
                                >
                                  <i className="icon-minus"></i>
                                </button>
                                <input
                                  className="small-input"
                                  value={product.quantite_demande}
                                />
                                <button
                                  onClick={() => addToCart(product)} // Augmenter la quantité
                                  className="quantity-btn plus"
                                >
                                  <i className="icon-plus"></i>
                                </button>
                              </div>
                            </td>

                            <td className="total-col">
                              {product.quantite_demande * product.prix}DT
                            </td>
                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={() => removeFromCart(product._id)}
                              >
                                <i className="icon-close"></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <aside className="col-lg-3">
                <div className="summary summary-cart">
                  <h3 className="summary-title">Total du Panier</h3>

                  {cart.length > 0 ? (
                    <table className="table table-summary">
                      <tbody>
                        <tr className="summary-subtotal">
                          <td>Sous-total :</td>
                          <td>{calculateSousTotal()}DT</td>
                        </tr>
                        <tr className="summary-shipping">
                          <td>Livraison :</td>
                          <td>&nbsp;</td>
                        </tr>

                        <tr className="summary-shipping-row">
                          <td>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="livraison-standard"
                                name="livraison"
                                className="custom-control-input"
                                defaultChecked
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="livraison-standard"
                              >
                                Standard :
                              </label>
                            </div>
                          </td>
                          <td>7DT</td>
                        </tr>

                        <tr className="summary-total">
                          <td>Total :</td>
                          <td>${calculateTotal()}</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : null}

                  {cart.length > 0 && (
                    <Link
                      to="/checkout"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                    >
                      PASSER À LA CAISSE
                    </Link>
                  )}
                </div>

                <Link
                  to="/"
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUER LES ACHATS</span>
                  <i className="icon-refresh"></i>
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
