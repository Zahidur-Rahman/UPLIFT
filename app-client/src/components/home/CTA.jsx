import React from "react"

export default function CTA() {
  return (
    <section className="cta-section section-padding section-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-5 col-12 ms-auto">
            <h2 className="mb-0">
              Make an impact. <br /> Save lives.
            </h2>
          </div>

          <div className="col-lg-5 col-12">
            <a href="/fund-req/all" className="me-4">
              Make a donation
            </a>

            <a href="#section_4" className="custom-btn btn smoothscroll">
              Become an Ambassador
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
