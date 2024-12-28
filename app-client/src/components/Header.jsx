import React from "react"

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 d-flex flex-wrap">
            <p className="d-flex me-4 mb-0">
              <i className="bi-geo-alt me-2"></i>
              University of Rajshahi
            </p>

            <p className="d-flex mb-0">
              <i className="bi-envelope me-2"></i>

              <a href="mailto:info@company.com">upliftapp@gmail.com</a>
            </p>
          </div>

          <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
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
                <a href="#" className="social-icon-link bi-youtube"></a>
              </li>

              <li className="social-icon-item">
                <a href="#" className="social-icon-link bi-whatsapp"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
