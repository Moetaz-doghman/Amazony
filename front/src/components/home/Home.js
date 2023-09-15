import React, { useEffect, useState } from "react";
import GridShop from "../gridShop";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../contexte/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slider";
import "./home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("rating"); // Par défaut, triez par "Most Rated"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { addToCart } = useCart(); // Utilisez le hook
  useState(false);
  const data = {
    name: "",
    url: "/",
  };
  const [priceRange, setPriceRange] = useState([0, 1000]); // Valeurs min et max du curseur
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]); // Valeurs sélectionnées

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handlePriceChangeComplete = (value) => {
    // Mettez à jour le filtre de prix après que l'utilisateur a relâché le curseur
    setPriceRange(value);
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    console.log(categoryValue);
    if (event.target.checked) {
      // Ajouter la catégorie sélectionnée à la liste des catégories sélectionnées
      setSelectedCategories([...selectedCategories, categoryValue]);
    } else {
      // Retirer la catégorie décochée de la liste des catégories sélectionnées
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryValue)
      );
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    let apiUrl = "http://localhost:8080/produit/getAllProduit";

    if (sortOption === "rating") {
      apiUrl = "http://localhost:8080/produit/getAllProduitByRating";
    } else if (sortOption === "date") {
      apiUrl = "http://localhost:8080/produit/getAllProduitByDate";
    }

    if (selectedCategories.length > 0) {
      // Filtrer par catégories sélectionnées si des catégories sont sélectionnées
      apiUrl = `http://localhost:8080/produit/getProduitsByCategories/${selectedCategories.join(
        ","
      )}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
        setIsLoading(false);
      });
  }, [sortOption, selectedCategories]);

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
      .get("http://localhost:8080/produit/getAllCategorie")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
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
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="rating">Most Rated</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                    </div>
                    <div className="toolbox-layout">
                      <svg width="16" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="12" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                        <rect x="12" y="6" width="4" height="4" />
                      </svg>
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
                                {product.quantite !== "0" && (
                                  <a
                                    href="#0"
                                    onClick={() => handleAddToCart(product)}
                                    className="btn-product btn-cart"
                                  >
                                    <span>add to cart</span>
                                  </a>
                                )}
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
                                    style={{
                                      width: `${
                                        (product.averageRating / 5) * 100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ratings-text">
                                  (Moyenne des avis )
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
                            <div className="filter-item" key={category.nom}>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`cat-${category.nom}`}
                                  value={category.nom}
                                  checked={selectedCategories.includes(
                                    category.nom
                                  )}
                                  onChange={handleCategoryChange}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`cat-${category.nom}`}
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
                            Price Range: {selectedPriceRange[0]}DT -{" "}
                            {selectedPriceRange[1]}DT
                          </div>
                          <Slider
                            min={priceRange[0]}
                            max={priceRange[1]}
                            value={selectedPriceRange}
                            onChange={handlePriceChange}
                            onAfterChange={handlePriceChangeComplete}
                          />
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
