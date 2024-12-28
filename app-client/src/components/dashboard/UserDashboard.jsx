import React, { useState, useEffect } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Bar } from "react-chartjs-2"
import { getUserReport } from "../../services/apiReport"
import { FaMoneyBillWave, FaClipboardCheck, FaExclamationTriangle } from "react-icons/fa"

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    latestRequest: {},
    totalContributions: 0,
    fundHistory: [],
    completedRequests: 0,
    pendingRequests: 0,
    totalFundRaised: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserReport()
        setUserData(res)
      } catch (err) {
        console.error("Error fetching user dashboard data", err)
      }
    }

    fetchUserData()
  }, [])

  const percentage = Math.min((userData.latestRequest.raised_amount / userData.latestRequest.goal_amount) * 100, 100)

  console.log("percentage", percentage)

  // Data for the fund history chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fund Contributions (৳)",
        data: userData.fundHistory,
        backgroundColor: "#5abfab",
      },
    ],
  }

  return (
    <DashboardLayout>
      <h1 className="text-center color-custom-green mb-5">User Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Latest Fund Request
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
                {percentage ? `${percentage.toFixed(2)}%` : "0%"}
              </span>
              <p className="mt-3">Asked amount: ৳{userData.latestRequest?.goal_amount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaMoneyBillWave size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Total Fund Raised
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{userData.totalFundRaised}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaMoneyBillWave size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Total Contributions
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{userData.totalContributions}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <div className="card text-center" style={{ borderColor: "#5abfab", minHeight: "200px" }}>
                <div className="card-body">
                  <FaClipboardCheck size={40} color="#5abfab" />
                  <h5 className="card-title" style={{ color: "#5abfab" }}>
                    Completed Requests
                  </h5>
                  <p style={{ fontSize: "1.5em" }}>{userData.completedRequests}</p>
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
                  <p style={{ fontSize: "1.5em" }}>{userData.pendingRequests}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card" style={{ borderColor: "#5abfab" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#5abfab" }}>
                Fund Contributions Over Time
              </h5>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
