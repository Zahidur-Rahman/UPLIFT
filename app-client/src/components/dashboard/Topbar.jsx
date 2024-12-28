import React from "react"
import { useAuth } from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { LocalStorage } from "../../utils"

export default function Topbar() {
  const user = LocalStorage.get("user")
  const { handleLogout } = useAuth()

  const toggleSidebar = localStorage.getItem("sb|sidebar-toggle") === "true"
  if (toggleSidebar) {
    document.body.classList.add("sb-sidenav-toggled")
  }

  const handleClick = (e) => {
    e.preventDefault()
    //add or remove class to sidebar
    document.body.classList.toggle("sb-sidenav-toggled")
    //save to localstorage
    localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled"))
  }

  const padding20px = {
    padding: "20px",
  }

  const padding12px = {
    padding: "12px",
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <button className="btn" style={{ backgroundColor: "#5abfab", color: "white" }} id="sidebarToggle" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item" style={padding20px}>
              {user && user.username ? `Welcome, ${user.username}` : ""}
            </li>
            <li className="nav-item" style={padding12px}>
              <input type="submit" value="Logout" className="btn btn-danger" onClick={handleLogout} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
