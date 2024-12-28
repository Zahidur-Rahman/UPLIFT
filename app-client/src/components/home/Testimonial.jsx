import React from "react"

export default function Testimonial() {
  return (
    <section className="testimonial-section section-padding section-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <h2 className="mb-lg-3">Happy Students</h2>

            <div id="testimonial-carousel" className="carousel carousel-fade slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="carousel-caption">
                    <h4 className="carousel-title">Hi, This is Farjana from University of Rajshahi.</h4>

                    <small className="carousel-name">
                      <span className="carousel-name-title">Farjana</span>, Student
                    </small>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-caption">
                    <h4 className="carousel-title">Hello, I'm Mamun from Khulna University of Engineering & Technology.</h4>

                    <small className="carousel-name">
                      <span className="carousel-name-title">Mamun</span>, Student
                    </small>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-caption">
                    <h4 className="carousel-title">Hello, I'm Rony from University of Dhaka.</h4>

                    <small className="carousel-name">
                      <span className="carousel-name-title">Rony</span>, Student
                    </small>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="carousel-caption">
                    <h4 className="carousel-title">Hi, This is Adrita from Shahjalal University of Science & Technology.</h4>

                    <small className="carousel-name">
                      <span className="carousel-name-title">Adrita</span>, Student
                    </small>
                  </div>
                </div>

                <ol className="carousel-indicators">
                  <li data-bs-target="#testimonial-carousel" data-bs-slide-to="0" className="active">
                    <img src="images/avatar/farjana.jpeg" className="img-fluid rounded-circle avatar-image" alt="avatar" />
                  </li>

                  <li data-bs-target="#testimonial-carousel" data-bs-slide-to="1" className="">
                    <img src="images/avatar/mamun.jpeg" className="img-fluid rounded-circle avatar-image" alt="avatar" />
                  </li>

                  <li data-bs-target="#testimonial-carousel" data-bs-slide-to="2" className="">
                    <img src="images/avatar/rony.jpeg" className="img-fluid rounded-circle avatar-image" alt="avatar" />
                  </li>

                  <li data-bs-target="#testimonial-carousel" data-bs-slide-to="3" className="">
                    <img src="images/avatar/adrita.jpeg" className="img-fluid rounded-circle avatar-image" alt="avatar" />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
