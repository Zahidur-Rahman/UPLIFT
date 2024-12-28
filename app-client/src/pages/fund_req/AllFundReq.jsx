import React, { useEffect, useState } from "react"
import { getAllFundReq } from "../../services/apiFundReq"
import { Link } from "react-router-dom"
import Layout from "../../layouts/Layout"
import Card from "../../components/Card"

export default function AllFundReq() {
  const [fundReqs, setFundReqs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all fund requests with await getAllFundReq()
  useEffect(() => {
    const fetchFundReqs = async () => {
      try {
        const { fundReqs } = await getAllFundReq()
        setFundReqs(fundReqs)
      } catch (error) {
        console.error("Error fetching fund requests", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFundReqs()
  }, [fundReqs])

  return (
    <Layout>
      <section className="section-padding" id="section_3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center mb-4">
              <h2>All Fund Requests</h2>
            </div>

            {loading && <p>Loading...</p>}
            {!loading && fundReqs.length === 0 && <p>No fund requests found</p>}
            {!loading && fundReqs.map((fundReq) => <Card fundReq={fundReq} key={fundReq._id} />)}
          </div>
        </div>
      </section>
    </Layout>
  )
}
