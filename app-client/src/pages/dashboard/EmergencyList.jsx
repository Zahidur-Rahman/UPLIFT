import React, { useEffect, useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import DataTable from "../../components/DataTable"
import { LocalStorage } from "../../utils"
import { getAllEmergencyFundReqsByCampus } from "../../services/apiFundReq"
import { Link } from "react-router-dom"

export default function EmergencyList() {
  const userCampus = LocalStorage.get("user").campus
  const [emergencies, setEmergencies] = useState([])
  const BaseURL = import.meta.env.VITE_PUBLIC_REACT_APP_API_URL

  const columns = [
    { Header: "ID", accessor: "serial" },
    { Header: "Goal Amount", accessor: "goal_amount" },
    { Header: "Disease", accessor: "disease" },
    { Header: "Description", accessor: "description" },
    { Header: "Verification Status (By Department)", accessor: "status", Cell: ({ value }) => (value === "pending" ? <span className="badge bg-warning">{value}</span> : value === "approved" ? <span className="badge bg-success">{value}</span> : value === "rejected" ? <span className="badge bg-danger">{value}</span> : <span className="badge bg-info">{value}</span>) },
    {
      Header: "Medical Records",
      accessor: "medical_records",
      Cell: ({ value }) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {value.map((url, index) => (
            <img key={index} src={`${BaseURL}${url}`} alt={`Medical Record ${index}`} style={{ width: "100px" }} />
          ))}
        </div>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true,
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="btn btn-warning me-2" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleReject(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const data = await getAllEmergencyFundReqsByCampus(userCampus)
        setEmergencies(data.fundReqs.map((emergency, index) => ({ ...emergency, serial: index + 1 })))
      } catch (error) {
        console.error(error)
      }
    }

    fetchEmergencies()
  }, [userCampus])

  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-end mt-4 mb-3">
        <Link to="/dashboard/fund-requests" className="btn bg-custom-green mb-4 float-right">
          Create Emergency
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-center mb-4 color-custom-green">Your Campus Emergencies</h1>
        <DataTable data={emergencies} columns={columns} />
      </div>
    </DashboardLayout>
  )
}
