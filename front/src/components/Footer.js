import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <div className="widget widget-about">
                  <img
                    src="assets/images/logo.png"
                    className="footer-logo"
                    alt="Footer Logo"
                    width="105"
                    height="25"
                  />
                  <p>
                    Praesent dapibus, neque id cursus ucibus, tortor neque
                    egestas augue, eu vulputate magna eros eu erat.
                  </p>

                  <div className="social-icons">
                    <a href="ss" className="social-icon" target="_blank" title="Facebook">
                      <i className="icon-facebook-f"></i>
                    </a>
                    <a href="ss" className="social-icon" target="_blank" title="Twitter">
                      <i className="icon-twitter"></i>
                    </a>
                    <a href="ss" className="social-icon" target="_blank" title="Instagram">
                      <i className="icon-instagram"></i>
                    </a>
                    <a href="ss" className="social-icon" target="_blank" title="Youtube">
                      <i className="icon-youtube"></i>
                    </a>
                    <a href="ss" className="social-icon" target="_blank" title="Pinterest">
                      <i className="icon-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="widget">
                  <h4 className="widget-title">Useful Links</h4>

                  <ul className="widget-list">
                    <li><a href="about.html">About Molla</a></li>
                    <li><a href="ss">How to shop on Molla</a></li>
                    <li><a href="ss">FAQ</a></li>
                    <li><a href="contact.html">Contact us</a></li>
                    <li><a href="login.html">Log in</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="widget">
                  <h4 className="widget-title">Customer Service</h4>

                  <ul className="widget-list">
                    <li><a href="ss">Payment Methods</a></li>
                    <li><a href="ss">Money-back guarantee!</a></li>
                    <li><a href="ss">Returns</a></li>
                    <li><a href="ss">Shipping</a></li>
                    <li><a href="ss">Terms and conditions</a></li>
                    <li><a href="ss">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="widget">
                  <h4 className="widget-title">My Account</h4>

                  <ul className="widget-list">
                    <li><a href="ss">Sign In</a></li>
                    <li><a href="cart.html">View Cart</a></li>
                    <li><a href="ss">My Wishlist</a></li>
                    <li><a href="ss">Track My Order</a></li>
                    <li><a href="ss">Help</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="footer-copyright">
              Copyright © 2019 Molla Store. All Rights Reserved.
            </p>
            <figure className="footer-payments">
              <img
                src="assets/images/payments.png"
                alt="Payment methods"
                width="272"
                height="20"
              />
            </figure>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
