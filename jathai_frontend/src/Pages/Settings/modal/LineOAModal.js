import React from "react";

function LineOAModal() {
  return (
    <div
      className="modal fade"
      id="lineOAModal"
      tabIndex="-1"
      aria-labelledby="lineOAModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="lineOAModalLabel">
              เพิ่ม LINE OA
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src="/L_gainfriends_2dbarcodes_BW.png"
              alt="LINE OA QR Code"
              className="img-fluid"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineOAModal;
