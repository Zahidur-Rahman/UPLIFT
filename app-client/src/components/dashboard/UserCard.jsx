import React from "react"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"

// UserCard Component (Left Side)
export default function UserCard({ user }) {
  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: "100%", borderColor: "#5abfab" }}>
      <div className="card-body text-center">
        <img src={user.image} alt={user.name} className="rounded-circle mb-3" style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #5abfab" }} />
        <h4 className="card-title" style={{ color: "#5abfab" }}>
          {user.name}
        </h4>
        <p className="mb-1">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-1">
          <strong>University:</strong> {user.university}
        </p>
        <p className="mb-1">
          <strong>Department:</strong> {user.department}
        </p>
        <div className="d-flex justify-content-center mt-3">
          {user.socialMedia.facebook && (
            <a href={user.socialMedia.facebook} className="text-muted mx-2" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
          )}
          {user.socialMedia.twitter && (
            <a href={user.socialMedia.twitter} className="text-muted mx-2" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
          )}
          {user.socialMedia.linkedin && (
            <a href={user.socialMedia.linkedin} className="text-muted mx-2" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          )}
          {user.socialMedia.instagram && (
            <a href={user.socialMedia.instagram} className="text-muted mx-2" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}