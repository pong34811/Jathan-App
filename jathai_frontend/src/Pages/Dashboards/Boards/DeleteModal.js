import React from "react";

function DeleteModal({ id, boardId, onDelete }) {
  const handleDelete = async () => {
    if (!boardId) return;
    await onDelete(boardId);
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Delete Board ?</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this board?
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
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
