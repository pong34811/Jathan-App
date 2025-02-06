import React from "react";
import { Navigate, useParams } from "react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { emailVerification } from "../reducer/Actions";

function EmailVerification({ emailVerification }) {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { key } = useParams();

  const handlingSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // ตั้งค่าให้แสดงสถานะโหลด
    emailVerification(key);
    setStatus(true);
  };

  if (status) {
    return <Navigate to={"/login/"} />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Activate Account</h2>
        <h5 className="text-center mb-4 text-muted">
          Click the button below to activate your account.
        </h5>
        <form className="mb-3" onSubmit={(e) => handlingSubmit(e)}>
          <div className="d-grid gap-2">
            {loading ? (
              <button className="btn btn-primary" type="button" disabled>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                &nbsp; Activating...
              </button>
            ) : (
              <button className="btn btn-primary" type="submit">
                Activate Account
              </button>
            )}
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { emailVerification })(EmailVerification);
