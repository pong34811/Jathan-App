import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordConfirm } from "../reducer/Actions";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function ResetPasswordConfirm({ resetPasswordConfirm }) {
  const [status, setStatus] = useState(false);
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
  });

  const [showPassword, setShowPassword] = useState({
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
    resetPasswordConfirm(uid, token, formData.new_password1, formData.new_password2);
    setStatus(true);
  };

  if (status) {
    return <Navigate to={"../login/"} />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">
          <FaLock className="me-2 text-primary" />
          Set New Password
        </h2>
        <form className="mb-3" onSubmit={handlingSubmit}>
          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="new_password1" className="form-label">New Password</label>
            <div className="input-group">
              <input
                name="new_password1"
                value={formData.new_password1}
                onChange={handlingInput}
                type={showPassword.new1 ? "text" : "password"}
                className="form-control"
                id="new_password1"
                placeholder="New password..."
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => togglePassword("new1")}>
                {showPassword.new1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-3">
            <label htmlFor="new_password2" className="form-label">Confirm New Password</label>
            <div className="input-group">
              <input
                name="new_password2"
                value={formData.new_password2}
                onChange={handlingInput}
                type={showPassword.new2 ? "text" : "password"}
                className="form-control"
                id="new_password2"
                placeholder="Confirm new password..."
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => togglePassword("new2")}>
                {showPassword.new2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">
              <FaLock className="me-2" /> Set Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);
