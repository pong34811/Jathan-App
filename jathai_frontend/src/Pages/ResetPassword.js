import React from "react";
import { Navigate } from "react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../reducer/Actions";

function ResetPassword({ resetPassword }) {
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlingSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setStatus(true);
  };
  if (status) {
    return <Navigate to={"../"}></Navigate>;
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}> 
  <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Reset Password</h2>
    <h5 className="text-center mb-4">
      Please input your registered email. The link for setting your new password
      will be sent to your email.
    </h5>
    <form className="mb-3" onSubmit={(e) => handlingSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          name="email"
          value={email}
          onChange={(e) => handlingInput(e)}
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit">Send Link</button>
      </div>
    </form>
  </div>
</div>

  );
}

export default connect(null, { resetPassword })(ResetPassword);
