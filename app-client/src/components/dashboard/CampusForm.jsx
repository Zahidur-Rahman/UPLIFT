import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

export default function CampusForm({ show, handleClose, handleSave }) {
  const [name, setName] = useState("")
  const [logo, setLogo] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const campusData = {
      name,
      logo,
      departments: [],
    }

    handleSave(campusData) // Pass campus data to parent component
  }

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]) // Update logo state with selected file
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Campus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Campus Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter campus name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" onChange={handleLogoChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Campus
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
