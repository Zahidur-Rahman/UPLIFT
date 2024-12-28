import React, { useEffect, useState, useMemo } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import DataTable from "../../components/DataTable"
import { getAllCampuses, createCampus, getDepartmentsByCampusId } from "../../services/apiCampuses"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import CampusForm from "../../components/dashboard/CampusForm"
import toast from "react-hot-toast"
import DepartmentForm from "../../components/dashboard/DepartmentForm"

export default function CampusList() {
  const [campuses, setCampuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeptModal, setShowDeptModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getAllCampuses()
        setCampuses(data.campuses)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchCampuses()
  }, [])

  const handleShowDepartments = async (campusId) => {
    try {
      const data = await getDepartmentsByCampusId(campusId)
      setSelectedDepartments(data.departments)
      setShowModal(true)
    } catch (err) {
      console.error("Failed to fetch departments:", err)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDepartments([])
  }

  const handleCreateCampus = () => {
    setShowCreateModal(true)
  }

  const handleShowDeptModal = () => {
    setShowDeptModal(true)
  }

  const handleCloseDeptModal = () => {
    setShowDeptModal(false)
  }

  const handleSaveCampus = async (campusData) => {
    try {
      const formData = new FormData()
      formData.append("name", campusData.name)
      formData.append("logo", campusData.logo)
      formData.append("departments", JSON.stringify(campusData.departments))

      const data = await createCampus(formData)

      // Display success toast
      toast.success("Campus created successfully!")

      // Close the create modal
      setShowCreateModal(false)

      // Update the campus list with the new campus data
      setCampuses((prevCampuses) => [...prevCampuses, data.campus])
    } catch (err) {
      console.error(err)

      // Show error toast instead of setting a breaking error state
      toast.error("Failed to create campus: " + err.message)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Campus Name",
        accessor: "name",
      },
      {
        Header: "Departments",
        accessor: "departments",
        Cell: ({ row }) => <Button onClick={() => handleShowDepartments(row.original._id)}>View Departments ({row.original.departments?.length || 0})</Button>,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => navigate(`/campuses/edit/${row.original._id}`)} className="btn btn-warning me-2">
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error.message}</p>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="color-custom-green">Campuses</h1>

            <div>
              <Button onClick={handleShowDeptModal} className="btn bg-custom-green me-2">
                Add Department
              </Button>
              <button onClick={handleCreateCampus} className="btn bg-custom-green">
                Create Campus
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={campuses} />

          {/* Modal for displaying departments */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Departments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedDepartments.length > 0 ? (
                <ul>
                  {selectedDepartments.map((dept) => (
                    <li key={dept._id}>
                      <strong>Name:</strong> {dept.name} <br />
                      <strong>Email:</strong> {dept.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No departments available.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for creating a new campus */}
          <CampusForm show={showCreateModal} handleClose={() => setShowCreateModal(false)} handleSave={handleSaveCampus} />
          <DepartmentForm show={showDeptModal} handleClose={handleCloseDeptModal} />
        </div>
      )}
    </DashboardLayout>
  )
}
