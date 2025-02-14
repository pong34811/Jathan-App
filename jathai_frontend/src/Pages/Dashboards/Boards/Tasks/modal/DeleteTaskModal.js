import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteTaskModal = ({ taskId, onDelete, onClose }) => {
  return (
    <div
      className="modal fade show"
      id="deleteTaskModal"
      style={{ display: "block", background: "rgba(0, 0, 0, 0.6)" }}
      tabIndex="-1"
      aria-labelledby="deleteTaskModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog  modal-sm">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-danger text-white">
            <FiAlertTriangle size={20} className="me-2" />
            <h5 className="modal-title" id="deleteTaskModalLabel">
              Delete Task
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-center">
              Are you sure you want to delete task <strong>ID: {taskId}</strong>?
              <br />
              <small className="text-muted">This action cannot be undone.</small>
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(taskId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
