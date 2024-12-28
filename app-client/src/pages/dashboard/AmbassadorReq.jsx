import React, { useEffect, useState } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { getAmbassadorRequests } from "../../services/apiDashboard"
import { Link } from "react-router-dom"
import DataTable from "../../components/DataTable"
import { acceptAmbassador, rejectAmbassador } from "../../services/apiDashboard"
import toast from "react-hot-toast"

export default function AmbassadorReq() {
  const [ambassadors, setAmbassadors] = useState([])

  const columns = [
    { Header: "ID", accessor: "serial" },
    { Header: "Name", accessor: "name" },
    { Header: "Campus", accessor: "campus" },
    { Header: "Department", accessor: "department" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true, // Disable sorting for this column
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {row.original.showAccept ? (
            <button className="btn btn-success me-2" onClick={() => handleAccept(row)}>
              Accept
            </button>
          ) : (
            <button className="btn btn-warning me-2" onClick={() => handleEdit(row)}>
              Edit
            </button>
          )}
          {row.original.showReject ? (
            <button className="btn btn-danger" onClick={() => handleReject(row)}>
              Reject
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => handleDelete(row)}>
              Delete
            </button>
          )}
        </div>
      ),
    },
  ]

  const handleEdit = (row) => {
    const editLink = row.original.editLink || "#"
    console.log("Editing row:", row.original)
    window.location.href = editLink
  }

  const handleDelete = (row) => {
    const deleteLink = row.original.deleteLink || "#"
    console.log("Deleting row:", row.original)
    window.location.href = deleteLink
  }

  const handleAccept = async (row) => {
    try {
      const data = await acceptAmbassador(row.original._id)
      toast.success(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleReject = async (row) => {
    try {
      const data = await rejectAmbassador(row.original._id)
      toast.success(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  // add temp id to each ambassador
  ambassadors.map((ambassador, index) => {
    ambassador.serial = index + 1
    ambassador.showAccept = true
    ambassador.showReject = true
    return ambassador
  })

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const data = await getAmbassadorRequests()
        setAmbassadors(data.data)
      } catch (error) {
        console.error("Error fetching ambassadors:", error)
      }
    }

    fetchAmbassadors()
  }, [ambassadors])
  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-end mt-4 mb-3">
        <Link to="/dashboard/ambassador" className="btn bg-custom-green mb-4 float-right">
          Back
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-center mb-4 color-custom-green">Pending Ambassador Request</h1>
        <DataTable data={ambassadors} columns={columns} />
      </div>
    </DashboardLayout>
  )
}
