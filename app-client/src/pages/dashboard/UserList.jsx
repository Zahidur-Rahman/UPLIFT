import React, { useEffect, useState, useMemo } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import DataTable from "../../components/DataTable"
import { getAllUsers } from "../../services/apiAuth" // Assuming you have this API method
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LocalStorage } from "../../utils"

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = LocalStorage.get("token")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(token)
        setUsers(data.users) // Assuming the API returns { users: [...] }
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [token])

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Campus",
        accessor: "campus",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => navigate(`/users/edit/${row.original._id}`)} className="btn btn-warning me-2">
              Edit
            </button>
          </div>
        ),
        disableSortBy: true,
      },
    ],
    [navigate]
  )

  return (
    <DashboardLayout>
      {/* Loading and Error handling inside DashboardLayout */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error.message}</p>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="color-custom-green">Users</h1>

            <div>
              <button onClick={() => navigate("/users/create")} className="btn bg-custom-green">
                Create User
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={users} />
        </>
      )}
    </DashboardLayout>
  )
}
