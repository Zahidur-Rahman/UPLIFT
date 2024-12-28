import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">
        <Link to="/" style={{ color: "#5abfab", fontWeight: "800", fontSize: "2rem" }}>
          Uplift
        </Link>
      </div>
      <div className="list-group list-group-flush">
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard">
          Dashboard
        </Link>
        {user.role == "ambassador" || user.role == "admin" ? (
          <>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/fund-requests">
              Fund Requests
            </Link>

            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/emergencies">
              Emergencies
            </Link>
          </>
        ) : null}
        {user.role == "admin" && (
          <>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/ambassador">
              Ambassador
            </Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/users">
              Users
            </Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/campuses">
              Campuses
            </Link>
          </>
        )}
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard/my-ambassador">
          Contact ambassador
        </Link>
      </div>
    </div>
  )
}
