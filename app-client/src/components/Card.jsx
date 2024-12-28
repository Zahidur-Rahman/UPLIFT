import React from "react"

export default function Card({ fundReq }) {
  return (
    <div className="col-lg-4 col-md-6 col-12 mb-5" key={fundReq._id}>
      <a href={`/fund-req/view/${fundReq._id}`}>
        <div className="custom-block-wrap border position-relative">
          {fundReq.status == "completed" ? (
            <span class="badge rounded bg-success position-absolute px-2 py-3" style={{ left: "-2px" }}>
              Completed
            </span>
          ) : fundReq.is_emergency ? (
            <span class="badge rounded bg-danger position-absolute px-2 py-3" style={{ left: "-2px" }}>
              Emergency
            </span>
          ) : null}
          <img src="/images/causes/cancer_cell.jpg" className="custom-block-image img-fluid" alt="" />

          <div className="custom-block">
            <div className="custom-block-body">
              <h5 className="mb-3">{fundReq.disease}</h5>

              <p>{fundReq.description}</p>

              <div className="progress mt-4">
                <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: `${fundReq.raised_amount >= fundReq.goal_amount ? 100 : (fundReq.raised_amount / fundReq.goal_amount) * 100}%` }}>
                  {" "}
                </div>
              </div>

              <div className="d-flex align-items-center my-2">
                <p className="mb-0">
                  <strong>Raised:</strong>
                  {fundReq.raised_amount} tk
                </p>

                <p className="ms-auto mb-0">
                  <strong>Goal:</strong>
                  {fundReq.goal_amount} tk
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
