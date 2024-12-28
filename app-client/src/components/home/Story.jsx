import React, { useEffect, useState } from "react"
import { getTotalDonations } from "../../services/apiFundReq"

export default function Story() {
  const [totalDonations, setTotalDonations] = useState(0)

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await getTotalDonations()
        setTotalDonations(response.totalDonations)
      } catch (error) {
        console.error("Error fetching total donations")
      }
    }

    fetchTotalDonations()
  }, [])

  return (
    <section className="section-padding section-bg" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mb-5 mb-lg-0">
            <img src="images/group_pic.jpeg" className="custom-text-box-image img-fluid" alt="" />
          </div>

          <div className="col-lg-6 col-12">
            <div className="custom-text-box">
              <h2 className="mb-2">Our Story</h2>

              <h5 className="mb-3">Uplift, Non-Profit Organization</h5>

              <p className="mb-0">The purpose of the project is to create a transparent, user-friendly, and efficient platform within university campuses for the purpose of facilitating seamless fundraising. It aims to meet the medical needs of financially struggling students by providing an accessible space for financial transactions.</p>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="custom-text-box mb-lg-0">
                  <h5 className="mb-3">Our Mission</h5>

                  <ul className="custom-list mt-2">
                    <li className="custom-list-item d-flex">
                      <i className="bi-check custom-text-box-icon me-2"></i>
                      Simplify the fundraising process
                    </li>

                    <li className="custom-list-item d-flex">
                      <i className="bi-check custom-text-box-icon me-2"></i>
                      Ensuring easy fund requests for students
                    </li>

                    <li className="custom-list-item d-flex">
                      <i className="bi-check custom-text-box-icon me-2"></i>
                      Convenient contributions for donors
                    </li>

                    <li className="custom-list-item d-flex">
                      <i className="bi-check custom-text-box-icon me-2"></i>
                      Promote transparency and trust in fundraising
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="custom-text-box d-flex flex-wrap d-lg-block mb-lg-0">
                  <div className="counter-thumb">
                    <div className="d-flex">
                      <span className="counter-number" data-from="1" data-to="2023" data-speed="1000">
                        2023
                      </span>
                      <span className="counter-number-text"></span>
                    </div>

                    <span className="counter-text">Established</span>
                  </div>

                  <div className="counter-thumb mt-4">
                    <div className="d-flex">
                      <span className="counter-number" data-from="1" data-to="0" data-speed="1000">
                        {totalDonations >= 1_000_000_000 ? (totalDonations / 1_000_000_000).toFixed(1) + "B" : totalDonations >= 1_000_000 ? (totalDonations / 1_000_000).toFixed(1) + "M" : totalDonations >= 1_000 ? (totalDonations / 1_000).toFixed(1) + "K" : totalDonations.toString()}
                      </span>
                    </div>
                    {/* <span className="counter-number-text"> TK</span> */}

                    <span className="counter-text">Donations</span>
                  </div>
                  <div className="counter-thumb mt-4">
                    <div className="d-flex">
                      <span className="counter-number" data-from="1" data-to="0" data-speed="1000">
                        0 TK
                      </span>
                    </div>
                    {/* <span className="counter-number-text"> TK</span> */}

                    <span className="counter-text">Transfered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
