import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { getAllCampuses, createDepartment } from "../../services/apiCampuses"
import toast from "react-hot-toast"

export default function DepartmentForm({ show, handleClose }) {
  const [campuses, setCampuses] = useState([])
  const [selectedCampus, setSelectedCampus] = useState("")
  const [deptName, setDeptName] = useState("")
  const [deptEmail, setDeptEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getAllCampuses()
        setCampuses(data.campuses)
        setLoading(false)
      } catch (err) {
        toast.error("Failed to load campuses")
        setLoading(false)
      }
    }
    fetchCampuses()
  }, [])

  const handleSubmit = async () => {
    try {
      const departmentData = {
        campusId: selectedCampus,
        name: deptName,
        email: deptEmail,
      }
      await createDepartment(departmentData)
      toast.success("Department created successfully!")
      window.location.reload()
      handleClose()
    } catch (err) {
      toast.error("Failed to create department: " + err.message)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCampus">
            <Form.Label>Select Campus</Form.Label>
            <Form.Control as="select" value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value)}>
              <option value="">Select a campus</option>
              {campuses.map((campus) => (
                <option key={campus._id} value={campus._id}>
                  {campus.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDeptName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control type="text" placeholder="Enter department name" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDeptEmail">
            <Form.Label>Department Email</Form.Label>
            <Form.Control type="email" placeholder="Enter department email" value={deptEmail} onChange={(e) => setDeptEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
