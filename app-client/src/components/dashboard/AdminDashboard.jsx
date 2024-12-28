import React, { useState, useEffect } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { Bar, Line, Pie } from "react-chartjs-2"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { getAdminReport } from "../../services/apiReport"
import { FaDollarSign, FaUserFriends, FaClipboardCheck, FaExclamationTriangle } from "react-icons/fa"

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState({
    totalRaised: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    fundHistory: [],
    fundGrowth: [],
    totalFundAmount: 0,
    uniqueDonors: 0,
  })

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await getAdminReport()
        setAdminData(res)
      } catch (err) {
        console.error("Error fetching admin report data", err)
      }
    }

    fetchAdminData()
  }, [])

  const percentage = Math.min((adminData.totalFundAmount / adminData.totalRaised) * 100, 100)

  // Data for charts
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{ label: "Fund History (৳)", data: adminData.fundHistory, backgroundColor: "#5abfab" }],
  }

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Fund Growth Over Time (৳)",
        data: adminData.fundGrowth.length ? adminData.fundGrowth : [0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(90, 191, 171, 0.2)",
        borderColor: "#5abfab",
      },
    ],
  }

  const pieData = {
    labels: ["Total Requests", "Completed Requests"],
    datasets: [
      {
        data: [adminData.totalRequests, adminData.completedRequests],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  }

  return (
    <DashboardLayout>
      <h1 className="text-center color-custom-green mb-5">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Total Raised Amount
              </h5>
              <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                  pathColor: "#5abfab",
                  trailColor: "#f4f4f4",
                })}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%", // Change this value to move the text vertically
                  left: "50%", // Change this value to move the text horizontally
                  transform: "translate(-50%, -50%)",
                  fontSize: "30px", // Adjust font size as needed
                  color: "#5abfab", // Change text color as needed
                }}
              >
                {percentage ? `${percentage.toFixed(1)}%` : "0%"}
              </span>
              <p className="mt-3">Raised: ৳{adminData.totalRaised.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaUserFriends size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Unique Donors
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{adminData.uniqueDonors}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaClipboardCheck size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Total Requests
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{adminData.totalRequests}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaExclamationTriangle size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Pending Requests
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{adminData.pendingRequests}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card" style={{ borderColor: "#5abfab" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Fund History
              </h5>
              <Bar data={barData} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ borderColor: "#5abfab" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Requests Status
              </h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card" style={{ borderColor: "#5abfab" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Fund Growth Over Time
              </h5>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
