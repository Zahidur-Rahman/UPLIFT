import React, { useEffect, useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { Link } from "react-router-dom"
import DataTable from "../../components/DataTable"
import { LocalStorage } from "../../utils"
import { getAllFundReqByCampus, makeEmergency } from "../../services/apiFundReq"
import toast from "react-hot-toast"

export default function FundReqListByCampus() {
  const userCampus = LocalStorage.get("user").campus
  const [fundReqs, setFundReqs] = useState([])
  const BaseURL = import.meta.env.VITE_PUBLIC_REACT_APP_API_URL

  const columns = [
    { Header: "ID", accessor: "serial" },
    { Header: "Goal Amount", accessor: "goal_amount" },
    { Header: "Disease", accessor: "disease" },
    { Header: "Description", accessor: "description" },
    { Header: "Verification Status", accessor: "status", Cell: ({ value }) => (value === "pending" ? <span className="badge bg-warning">{value}</span> : value === "approved" ? <span className="badge bg-success">{value}</span> : value === "rejected" ? <span className="badge bg-danger">{value}</span> : <span className="badge bg-info">{value}</span>) },
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
      Cell: ({ row }) =>
        row.original.is_emergency ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span className="badge bg-danger">Emergency</span>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button className="btn btn-info me-2" onClick={() => handleEdit(row)}>
              Make Emergency
            </button>
          </div>
        ),
    },
  ]

  const handleEdit = async (row) => {
    try {
      const res = await makeEmergency(row.original._id)
      if (res.status === "success") {
        toast.success(res.message)
        //reload the page
        window.location.reload()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const fetchFundReqs = async () => {
      try {
        const data = await getAllFundReqByCampus(userCampus)
        setFundReqs(data.fundReqs.map((fundReq, index) => ({ ...fundReq, serial: index + 1 })))
      } catch (error) {
        console.error(error)
      }
    }

    fetchFundReqs()
  }, [fundReqs.length, userCampus])
  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-end mt-4 mb-3">
        <Link to="/dashboard/emergencies" className="btn bg-custom-green mb-4 float-right">
          Back
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-center mb-4 color-custom-green">Your Campus Fund Requests</h1>
        <DataTable data={fundReqs} columns={columns} />
      </div>
    </DashboardLayout>
  )
}
