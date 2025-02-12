import React from "react";
import useDisconnectLine from "../controller/useDisconnectLine";

function DeleteLineModal() {
  const { handleDisconnectLine } = useDisconnectLine();

  return (
    <div
      className="modal fade"
      id="DeleteLineModal"
      tabIndex="-1"
      aria-labelledby="DeleteLineModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title" id="DeleteLineModalLabel">
              ยืนยันการตัดการเชื่อมต่อ LINE
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <p className="fw-bold text-danger">
              คุณแน่ใจหรือไม่ว่าต้องการตัดการเชื่อมต่อบัญชี LINE ออกจากระบบ?
            </p>
            <p className="text-muted">
              หลังจากตัดการเชื่อมต่อ คุณจะไม่สามารถใช้ฟีเจอร์ที่เกี่ยวข้องกับ
              LINE ได้อีก
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDisconnectLine}
              data-bs-dismiss="modal"
            >
              ตัดการเชื่อมต่อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteLineModal;
