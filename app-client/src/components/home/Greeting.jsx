import React from "react"

export default function Greeting() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 text-center mx-auto">
            <h2 className="mb-5">Welcome to Uplift</h2>
          </div>

          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="featured-block d-flex justify-content-center align-items-center">
              {/* when i click on this link it will take me to the Ambassador component section */}

              <a href="#section_4" className="d-block">
                <img src="images/icons/hands.png" className="featured-block-image img-fluid" alt="" />

                <p className="featured-block-text">
                  Become a <strong>Campus Ambassador</strong>
                </p>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4">
            <div className="featured-block d-flex justify-content-center align-items-center">
              <a href="/fund-req/create" className="d-block">
                <img src="images/icons/heart.png" className="featured-block-image img-fluid" alt="" />

                <p className="featured-block-text">
                  <strong>Request</strong> Funds
                </p>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4">
            <div className="featured-block d-flex justify-content-center align-items-center">
              <a href="/fund-req/all" className="d-block">
                <img src="images/icons/receive.png" className="featured-block-image img-fluid" alt="" />

                <p className="featured-block-text">
                  Make a <strong>Donation</strong>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
