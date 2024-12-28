import React from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { LocalStorage } from "../utils"

export default function Navbar() {
  const isAuthenticated = LocalStorage.get("user") ? true : false
  const { handleLogout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-lg sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/images/logo.png" className="logo img-fluid" alt="Kind Heart Charity" />
          <span>
            Uplift
            <small>Non-profit Organization</small>
          </span>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link click-scroll" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="/about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="/fund-req/emergencies">
                Emergencies
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="/ambassador">
                Ambassador
              </a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link click-scroll dropdown-toggle" href="#section_5" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>

              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                <li>
                  {isAuthenticated ? (
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/login" className="dropdown-item">
                      sign in
                    </Link>
                  )}
                </li>

                <li>
                  {isAuthenticated ? (
                    <input type="submit" className="dropdown-item" name="logout" value="logout" onClick={handleLogout} />
                  ) : (
                    <Link to="/register" className="dropdown-item">
                      sign up
                    </Link>
                  )}
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="/contact">
                Contact
              </a>
            </li>

            <li className="nav-item ms-3">
              <a className="nav-link custom-btn custom-border-btn btn" href="/fund-req/all">
                Donate
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
