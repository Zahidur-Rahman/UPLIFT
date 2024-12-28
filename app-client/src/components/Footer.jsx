import React from "react"

export default function Footer() {
  return (
    <div>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 mb-4">
              <img src="/images/logo.png" className="logo img-fluid" alt="" />
            </div>

            <div className="col-lg-4 col-md-6 col-12 mb-4">
              <h5 className="site-footer-title mb-3">Quick Links</h5>

              <ul className="footer-menu">
                <li className="footer-menu-item">
                  <a href="#section_2" className="footer-menu-link">
                    Our Story
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="#" className="footer-menu-link">
                    Causes
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="#section_6" className="footer-menu-link">
                    Contact
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="/login" className="footer-menu-link">
                    Create Account
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="/ambassador" className="footer-menu-link">
                    Become an ambassador
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="#" className="footer-menu-link">
                    Partner with us
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 col-12 mx-auto">
              <h5 className="site-footer-title mb-3">Contact Infomation</h5>

              <p className="text-white d-flex mb-2">
                <i className="bi-telephone me-2"></i>

                <a href="tel: 120-240-9600" className="site-footer-link">
                  120-240-9600
                </a>
              </p>

              <p className="text-white d-flex">
                <i className="bi-envelope me-2"></i>

                <a href="mailto:upliftapp@gmail.com" className="site-footer-link">
                  upliftapp@gmail.com
                </a>
              </p>

              <p className="text-white d-flex mt-3">
                <i className="bi-geo-alt me-2"></i>
                University of Rajshahi
              </p>

              <a href="#" className="custom-btn btn mt-3">
                Get Direction
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-12">
                <p className="copyright-text mb-0">
                  Copyright © 2024 <a href="#">Uplift</a> Fundraising Org.
                </p>
              </div>

              <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                <ul className="social-icon">
                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-twitter"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-facebook"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-instagram"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-linkedin"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-youtube"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
