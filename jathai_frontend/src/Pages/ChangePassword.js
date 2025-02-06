import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../reducer/Actions";
import { FaEye, FaEyeSlash, FaLock, FaKey } from "react-icons/fa";

function ChangePassword({ isAuthenticated, changePassword }) {
  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new1: false,
    new2: false,
  });

  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    changePassword(formData.new_password1, formData.new_password2, formData.old_password);
  };

  if (!isAuthenticated && !localStorage.getItem("access")) {
    return <Navigate to={"../login"} />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">
          <FaLock className="me-2 text-primary" />
          Change Password
        </h2>
        <form onSubmit={handlingSubmit}>
          {/* Old Password */}
          <div className="mb-3">
            <label htmlFor="old_password" className="form-label">
              <FaKey className="me-2" /> Old Password
            </label>
            <div className="input-group">
              <input
                type={showPassword.old ? "text" : "password"}
                className="form-control"
                id="old_password"
                name="old_password"
                value={formData.old_password}
                onChange={handlingInput}
                placeholder="Enter old password..."
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => togglePassword("old")}>
                {showPassword.old ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="new_password1" className="form-label">
              <FaKey className="me-2" /> New Password
            </label>
            <div className="input-group">
              <input
                type={showPassword.new1 ? "text" : "password"}
                className="form-control"
                id="new_password1"
                name="new_password1"
                value={formData.new_password1}
                onChange={handlingInput}
                placeholder="Enter new password..."
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => togglePassword("new1")}>
                {showPassword.new1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-3">
            <label htmlFor="new_password2" className="form-label">
              <FaKey className="me-2" /> Confirm New Password
            </label>
            <div className="input-group">
              <input
                type={showPassword.new2 ? "text" : "password"}
                className="form-control"
                id="new_password2"
                name="new_password2"
                value={formData.new_password2}
                onChange={handlingInput}
                placeholder="Re-enter new password..."
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => togglePassword("new2")}>
                {showPassword.new2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">
              <FaLock className="me-2" /> Change Password
            </button>
          </div>
        </form>
        
        {/* Link for help */}
        <div className="text-center mt-3">
          <p>
            Forgot your password?{" "}
            <Link to={"../reset/password/"}>Reset Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.isAuthenticated,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
