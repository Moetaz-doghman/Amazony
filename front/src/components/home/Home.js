import React, { useEffect, useState } from "react";
import GridShop from "../gridShop";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../contexte/CartContext";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart(); // Utilisez le hook
  useState(false);
  const data = {
    name: "",
    url: "/",
  };

  const handleAddToCart = (product) => {
    // Appeler la fonction addToCart du contexte pour ajouter le produit au panier
    addToCart(product);

    // Afficher une notification de toast
    toast.success("Le produit a été ajouté au panier avec succès!", {
      duration: 3000, // Durée d'affichage en millisecondes (3 secondes dans cet exemple)
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/produit/getAllProduit")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false); // Définissez isLoading sur false une fois les données chargées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
        setIsLoading(false); // Assurez-vous de définir isLoading sur false en cas d'erreur aussi
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/produit/getAllCategorie")
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalProducts = products.length;

  return (
    <div>
      <main className="main">
        <GridShop data={data} />
        <Toaster />
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="toolbox">
                  <div className="toolbox-left">
                    <div className="toolbox-info">
                      Showing{" "}
                      <span>
                        {Math.min(totalProducts, currentPage * itemsPerPage)}
                      </span>{" "}
                      of {totalProducts} Products
                    </div>
                  </div>

                  <div className="toolbox-right">
                    <div className="toolbox-sort">
                      <label htmlFor="sortby">Sort by:</label>
                      <div className="select-custom">
                        <select
                          name="sortby"
                          id="sortby"
                          className="form-control"
                        >
                          <option value="popularity" defaultValue>
                            Most Popular
                          </option>
                          <option value="rating">Most Rated</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                    </div>
                    <div className="toolbox-layout">
                      <a href="category.html" className="btn-layout active">
                        <svg width="16" height="10">
                          <rect x="0" y="0" width="4" height="4" />
                          <rect x="6" y="0" width="4" height="4" />
                          <rect x="12" y="0" width="4" height="4" />
                          <rect x="0" y="6" width="4" height="4" />
                          <rect x="6" y="6" width="4" height="4" />
                          <rect x="12" y="6" width="4" height="4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="products mb-3">
                  {isLoading ? (
                    <div className="loading-indicator">
                      Chargement en cours...
                    </div>
                  ) : (
                    <div className="row justify-content-center">
                      {currentProducts.map((product) => (
                        <div
                          key={product._id}
                          className="col-6 col-md-4 col-lg-4"
                        >
                          <div className="product product-7 text-center">
                            <figure className="product-media">
                              {product.quantite === "0" ? (
                                <span className="product-label label-out">
                                  Out of Stock
                                </span>
                              ) : (
                                <span className="product-label label-new">
                                  New
                                </span>
                              )}{" "}
                              <Link to={`/${product._id}`}>
                                <img
                                  src={product.images[0].secure_url}
                                  alt="Product im"
                                  className="product-image"
                                  style={{ height: "280px", width: "280px" }}
                                />
                              </Link>
                              <div className="product-action-vertical">
                                <Link
                                  to={`/${product._id}`}
                                  className="btn-product-icon btn-quickview"
                                  title="Quick view"
                                >
                                  <span>Quick view</span>
                                </Link>
                              </div>
                              <div className="product-action">
                                <a
                                  href="#0"
                                  onClick={() => handleAddToCart(product)}
                                  className="btn-product btn-cart"
                                >
                                  <span>add to cart</span>
                                </a>
                              </div>
                            </figure>

                            <div className="product-body">
                              <div className="product-cat">
                                <Link to={`/${product._id}`}>
                                  {product.categorie}
                                </Link>
                              </div>
                              <h3 className="product-title">
                                <Link to={`/${product._id}`}>
                                  {product.titre}
                                </Link>
                              </h3>
                              <div className="product-price">
                                {product.prix}DT
                              </div>
                              <div className="ratings-container">
                                <div className="ratings">
                                  <div
                                    className="ratings-val"
                                    style={{ width: "20%" }}
                                  ></div>
                                </div>
                                <span className="ratings-text">
                                  ( 2 Reviews )
                                </span>
                              </div>

                              <div className="product-nav product-nav-thumbs">
                                {product.images.map((image, index) => (
                                  <a
                                    key={`${index}-${image.secure_url}`}
                                    href="aaa"
                                    className="active"
                                  >
                                    <img
                                      src={image.secure_url}
                                      alt={`Ima ${index}`}
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                        maxWidth: "400px",
                                      }}
                                    />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#01"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        Précédent
                      </a>
                    </li>
                    {Array.from({
                      length: Math.ceil(products.length / itemsPerPage),
                    }).map((item, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#0"
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(products.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#0"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Suivant
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <aside className="col-lg-3 order-lg-first">
                <div className="sidebar sidebar-shop">
                  <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a href="aaa" className="sidebar-filter-clear">
                      Clean All
                    </a>
                  </div>

                  <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#widget-1"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-1"
                      >
                        Category
                      </a>
                    </h3>

                    <div className="collapse show" id="widget-1">
                      <div className="widget-body">
                        <div className="filter-items filter-items-count">
                          {categories.map((category) => (
                            <div className="filter-item" key={category.id}>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`cat-${category.id}`}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`cat-${category.id}`}
                                >
                                  {category.nom}
                                </label>
                              </div>
                              {/* Afficher le nombre de produits dans cette catégorie */}
                              <span className="item-count">
                                {category.nombreDeProduits}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#widget-5"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-5"
                      >
                        Price
                      </a>
                    </h3>

                    <div className="collapse show" id="widget-5">
                      <div className="widget-body">
                        <div className="filter-price">
                          <div className="filter-price-text">
                            Price Range:
                            <span id="filter-price-range"></span>
                          </div>
                          <div id="price-slider"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
