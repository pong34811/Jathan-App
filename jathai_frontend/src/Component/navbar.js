import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";

function navbar({ logout, isAuthenticated }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container-fluid d-flex justify-content-between">
        {/* โลโก้ด้านซ้าย */}
        <Link className="navbar-brand" to="/">
          Jathan App
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
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* เมนูด้านขวา */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/docs">
                    Docs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/change/password">
                    Change Password
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link active" onClick={logout} id="logout" style={{ cursor: "pointer" }}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/signup">
                    Signup
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
