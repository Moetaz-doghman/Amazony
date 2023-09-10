import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProduit = () => {
  // Utilisez useParams pour obtenir l'ID du produit à partir de l'URL
  const { produitId } = useParams();

  useEffect(() => {
    console.log(produitId);
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:8080/produit/getProduitsById/${produitId}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du produit",
          error
        );
        // Gérer l'erreur ici
      }
    }

    fetchProduct();
  }, [produitId]);
  // État pour stocker les données du produit
  const [product, setProduct] = useState(null);

  if (!product) {
    return <div>Loading...</div>; // Vous pouvez afficher un message de chargement
  }
  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      <img
                        id="product-zoom"
                        src={product.images[0].secure_url}
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                        alt="product "
                        style={{ height: "458px", width: "458px" }}
                      />

                      <a
                        href="dd"
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                      >
                        <i className="icon-arrows"></i>
                      </a>
                    </figure>

                    <div
                      id="product-zoom-gallery"
                      className="product-image-gallery"
                    >
                      {product.images.map((image, index) => (
                        <a
                          key={index}
                          className={`product-gallery-item ${
                            index === 0 ? "active" : ""
                          }`}
                          href={image.secure_url}
                          data-image={image.secure_url}
                          data-zoom-image={image.secure_url}
                        >
                          <img
                            src={image.secure_url}
                            alt={`Product  ${index + 1}`}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{product.titre}</h1>

                  <div className="ratings-container">
                    <div className="ratings">
                      <div
                        className="ratings-val"
                        style={{ width: "80%" }}
                      ></div>
                    </div>

                    <a
                      className="ratings-text"
                      href="#product-review-link"
                      id="review-link"
                    >
                      ( 2 Reviews )
                    </a>
                  </div>

                  <div className="product-price">{product.prix}DT</div>

                  <div className="product-content">
                    <p>{product.description}</p>
                  </div>

                  <div className="details-filter-row details-row-size">
                    <label>Color:</label>
                    {product.couleur}
                  </div>

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="size">Size:</label>
                    <div className="select-custom">
                      <select name="size" id="size" className="form-control">
                        <option value="#" selected="selected">
                          Select a size
                        </option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>

                    <a href="dd" className="size-guide">
                      <i className="icon-th-list"></i>size guide
                    </a>
                  </div>

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        value={product.quantite}
                        min="1"
                        max="10"
                        step="1"
                        data-decimals="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="product-details-action">
                    <a href="dd" className="btn-product btn-cart">
                      <span>add to cart</span>
                    </a>
                  </div>

                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Category:</span>
                      <a href="dd">{product.categorie}</a>
                    </div>

                    <div className="social-icons social-icons-sm">
                      <span className="social-label">Share:</span>
                      <a
                        href="dd"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f"></i>
                      </a>
                      <a
                        href="dd"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter"></i>
                      </a>
                      <a
                        href="dd"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram"></i>
                      </a>
                      <a
                        href="dd"
                        className="social-icon"
                        title="Pinterest"
                        target="_blank"
                      >
                        <i className="icon-pinterest"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-review-link"
                  data-toggle="tab"
                  href="#product-review-tab"
                  role="tab"
                  aria-controls="product-review-tab"
                  aria-selected="false"
                >
                  Reviews (2)
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  <h3>Product Information</h3>
                  <p>{product.description_detaillee}</p>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="product-review-tab"
                role="tabpanel"
                aria-labelledby="product-review-link"
              >
                <div className="reviews">
                  <h3>Reviews (2)</h3>
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="dd">Samanta J.</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                        </div>

                        <span className="review-date">6 days ago</span>
                      </div>

                      <div className="col">
                        <h4>Good, perfect size</h4>

                        <div className="review-content">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ducimus cum dolores assumenda asperiores
                            facilis porro reprehenderit animi culpa atque
                            blanditiis commodi perspiciatis doloremque,
                            possimus, explicabo, autem fugit beatae quae
                            voluptas!
                          </p>
                        </div>

                        <div className="review-action">
                          <a href="dd">
                            <i className="icon-thumbs-up"></i>Helpful (2)
                          </a>
                          <a href="dd">
                            <i className="icon-thumbs-down"></i>Unhelpful (0)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-4">You May Also Like</h2>

          <div
            className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
            data-toggle="owl"
            data-owl-options='{
                            "nav": false, 
                            "dots": true,
                            "margin": 20,
                            "loop": false,
                            "responsive": {
                                "0": {
                                    "items":1
                                },
                                "480": {
                                    "items":2
                                },
                                "768": {
                                    "items":3
                                },
                                "992": {
                                    "items":4
                                },
                                "1200": {
                                    "items":4,
                                    "nav": true,
                                    "dots": false
                                }
                            }
                        }'
          >
            <div className="product product-7 text-center">
              <figure className="product-media">
                <span className="product-label label-new">New</span>
                <a href="product.html">
                  <img
                    src="assets/images/products/product-4.jpg"
                    alt="Product dd"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="dd"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="dd"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>

                <div className="product-action">
                  <a href="dd" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
              </figure>

              <div className="product-body">
                <div className="product-cat">
                  <a href="dd">Women</a>
                </div>

                <h3 className="product-title">
                  <a href="product.html">
                    Brown paperbag waist <br />
                    pencil skirt
                  </a>
                </h3>
                <div className="product-price">$60.00</div>
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "20%" }}></div>
                  </div>

                  <span className="ratings-text">( 2 Reviews )</span>
                </div>

                <div className="product-nav product-nav-thumbs">
                  <a href="dd" className="active">
                    <img
                      src="assets/images/products/product-4-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                  <a href="dd">
                    <img
                      src="assets/images/products/product-4-2-thumb.jpg"
                      alt="product desc"
                    />
                  </a>

                  <a href="dd">
                    <img
                      src="assets/images/products/product-4-3-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suggestions />
    </div>
  );
};

export default DetailProduit;
