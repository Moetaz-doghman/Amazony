import React from "react";
import GridShop from "../gridShop";

const Checkout = () => {
  const data = {
    name: "Commander",
    url: "/checkout",
  };

  return (
    <div>
      <GridShop data={data} />
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <form action="#">
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="checkout-title">Détails de facturation</h2>

                  <label>(الاسم و اللقب) Nom et Prenom *</label>
                  <input type="text" className="form-control" required />

                  <label>(الولاية) Ville *</label>
                  <input type="text" className="form-control" required />
                  <label>(العنوان) Adresse *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Numéro de maison et nom de la rue"
                    required
                  />
                  <label>(الهاتف) Téléphone *</label>
                  <input type="tel" className="form-control" required />

                  <label>(ملاحظات الطلب) Notes de commande (facultatif)</label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Notes concernant votre commande, par exemple des instructions spéciales pour la livraison"
                  ></textarea>
                </div>
                <aside className="col-lg-3">
                  <div className="summary">
                    <h3 className="summary-title">Votre commande</h3>

                    <table className="table table-summary">
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            <a href="#@">
                              Robe denim à bretelles utilitaires bleue
                            </a>
                          </td>
                          <td>$76,00</td>
                        </tr>
                        <tr className="summary-subtotal">
                          <td>Sous-total :</td>
                          <td>$160,00</td>
                        </tr>
                        <tr>
                          <td>Livraison :</td>
                          <td>7DT</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total :</td>
                          <td>$160,00</td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      type="submit"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                    >
                      Passer la commande
                    </button>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
