import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import "../css/navbar.css"
import { FaHome, FaSignInAlt, FaUserPlus, FaBook, FaLock, FaSignOutAlt, FaBars } from "react-icons/fa";

function navbar({ logout, isAuthenticated }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm py-2" style={{ backgroundColor: "#062c80" }}>
      <div className="container-fluid d-flex justify-content-between">
        {/* โลโก้ด้านซ้าย */}
        <Link className="navbar-brand" to="/">
          <img src="/logo.webp" className="img-fluid rounded-top" alt="" />
        </Link>

        {/* Toggle Button สำหรับมือถือ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars style={{ color: 'white' }} />
        </button>

        {/* เมนูด้านขวา */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold d-flex align-items-center" to="/">
                    <FaHome className="me-1" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold d-flex align-items-center" to="/docs">
                    <FaBook className="me-1" /> Docs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold d-flex align-items-center" to="/settings">
                    <FaBook className="me-1" /> Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center" to="/change/password">
                    <FaLock className="me-1" /> Change Password
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-danger d-flex align-items-center"
                    onClick={logout}
                    id="logout"
                    style={{ cursor: "pointer" }}
                  >
                    <FaSignOutAlt className="me-1" /> Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold d-flex align-items-center" to="/">
                    <FaHome className="me-1" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold d-flex align-items-center" to="/docs">
                    <FaBook className="me-1" /> Docs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-info fw-bold d-flex align-items-center" to="/login">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light fw-bold d-flex align-items-center" to="/signup">
                    <FaUserPlus className="me-1" /> Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { logout })(navbar)
