import React from "react";

const Suggestions = () => {
  return (
    <div>
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
              "items": 1
            },
            "480": {
              "items": 2
            },
            "768": {
              "items": 3
            },
            "992": {
              "items": 4
            },
            "1200": {
              "items": 4,
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
                          id="product-zoom"
                          src="assets/images/products/single/1.jpg"
                          data-zoom-image="assets/images/products/single/1-big.jpg"
                          alt="product "
                        />
            </a>

            <div className="product-action-vertical">
              <a href="#0" className="btn-product-icon btn-wishlist btn-expandable">
                <span>add to wishlist</span>
              </a>
              <a
                href="popup/quickView.html"
                className="btn-product-icon btn-quickview"
                title="Quick view"
              >
                <span>Quick view</span>
              </a>
              <a href="#0" className="btn-product-icon btn-compare" title="Compare">
                <span>Compare</span>
              </a>
            </div>
            <div className="product-action">
              <a href="#0" className="btn-product btn-cart">
                <span>add to cart</span>
              </a>
            </div>
          </figure>

          <div className="product-body">
            <div className="product-cat">
              <a href="#0">Women</a>
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
              <a href="#0" className="active">
                <img
                  src="assets/images/products/product-4-thumb.jpg"
                  alt="product desc"
                />
              </a>
              <a href="#0">
                <img
                  src="assets/images/products/product-4-2-thumb.jpg"
                  alt="product desc"
                />
              </a>
              <a href="#0">
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
  );
};

export default Suggestions;
