import React, { useEffect, useState } from "react"
import DataTable from "../../components/DataTable"
import DashboardLayout from "../../layouts/DashboardLayout"
import { getAmbassadors } from "../../services/apiDashboard"
import { Link } from "react-router-dom"

function App() {
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
  // add temp id to each ambassador
  ambassadors.map((ambassador, index) => {
    ambassador.serial = index + 1
    return ambassador
  })

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const data = await getAmbassadors()
        setAmbassadors(data.data)
      } catch (error) {
        console.error("Error fetching ambassadors:", error)
      }
    }

    fetchAmbassadors()
  }, [])
  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-end mt-4 mb-3">
        <Link to="/dashboard/ambassador-requests" className="btn bg-custom-green mb-4 float-right">
          Pending Requests
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-center mb-4 color-custom-green">Campus Ambassador List</h1>
        <DataTable data={ambassadors} columns={columns} />
      </div>
    </DashboardLayout>
  )
}

export default App
