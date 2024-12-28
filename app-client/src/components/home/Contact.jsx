import React from "react"

export default function Contact() {
  return (
    <section className="contact-section section-padding" id="section_6">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12 ms-auto mb-5 mb-lg-0">
            <div className="contact-info-wrap">
              <h2>Get in touch</h2>

              <div className="contact-info">
                <h5 className="mb-3">Contact Infomation</h5>

                <p className="d-flex mb-2">
                  <i className="bi-geo-alt me-2"></i>
                  University of Rajshahi
                </p>

                <p className="d-flex mb-2">
                  <i className="bi-telephone me-2"></i>

                  <a href="tel: 120-240-9600">120-240-9600</a>
                </p>

                <p className="d-flex">
                  <i className="bi-envelope me-2"></i>

                  <a href="mailto:info@yourgmail.com">upliftapp@gmail.com</a>
                </p>

                <a href="#" className="custom-btn btn mt-3">
                  Get Direction
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-12 mx-auto">
            <form className="custom-form contact-form" action="#" method="post" role="form">
              <h2>Contact Us</h2>

              <p className="mb-4">  
                Or, you can just send an email:&nbsp;   
                <a href="#">upliftapp@gmail.com</a>
              </p>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input type="text" name="first-name" id="first-name" className="form-control" placeholder="First Name" required />
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <input type="text" name="last-name" id="last-name" className="form-control" placeholder="Last Name" required />
                </div>
              </div>

              <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Your Email" required />

              <textarea name="message" rows="5" className="form-control" id="message" placeholder="How can we help you?"></textarea>

              <button type="submit" className="form-control">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
