import React, { useEffect, useState } from "react"
import { getEmergencyFundReq } from "../../services/apiFundReq"
import { Link } from "react-router-dom"
import Card from "../Card"

export default function Emergency() {
  const [fundReqs, setFundReqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEmergencyFundReq()
      .then((res) => {
        setFundReqs(res.fundReqs)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [fundReqs])

  return (
    <section className="section-padding" id="section_3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12 text-center mb-4">
            <h2>Emergencies</h2>
          </div>

          {loading && <p>Loading...</p>}
          {!loading && fundReqs.length === 0 && <p>No emergency fund requests found</p>}
          {!loading && fundReqs.map((fundReq) => <Card fundReq={fundReq} key={fundReq._id} />)}
        </div>
      </div>
    </section>
  )
}
