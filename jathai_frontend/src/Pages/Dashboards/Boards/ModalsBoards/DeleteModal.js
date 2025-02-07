// C:\Users\admin\Desktop\git\Jathan-App\jathai_frontend\src\Pages\Dashboards\Boards\ModalsBoards\DeleteModal.js
import React from "react";
import { useNavigate } from "react-router-dom";
// ปรับ path ให้ถูกต้องตามโครงสร้างโปรเจคของคุณ
import { URL_AUTH } from "../../../../Apis/ConfigApis";

function DeleteModal({ id, boardId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!boardId) {
      console.error("Board ID is undefined");
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login/");
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch(`${URL_AUTH.BoardAPI}${boardId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting board: ${response.status}`);
      }

      console.log("Board deleted successfully", boardId);
      // หลังจากลบ board สำเร็จแล้ว สามารถรีเฟรชหน้า หรืออัปเดต state ใหม่ได้
      window.location.reload(); // หรือปรับปรุง state เพื่อรีเฟรชข้อมูล board
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Delete Board {boardId}?</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this board?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
