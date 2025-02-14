// C:\Users\admin\Desktop\git\Jathan-App\jathai_frontend\src\Pages\Dashboards\Boards\BoardCard\BoardWorkspace.js
import React from 'react';
import { IoFolderOpen } from 'react-icons/io5';
import { FaEdit, FaStar, FaRegStar, FaList, FaTasks, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const BoardWorkspace = ({
  id,
  title,
  list_count,
  task_count,
  details,
  created_at,
  board_at,
  isStarred,
  handleClick,
  setEditBoard,
  setConfirmDeleteId,
  handleJoinBoard
}) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
      <div className="card shadow-lg border-0 rounded-3 overflow-hidden h-100">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h6
            className="mb-0 text-truncate d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            onClick={() => setEditBoard(id)}
          >
            <FaEdit size={20} className="me-2" />
            <span className="flex-grow-1 text-truncate" style={{width:"120px"}}>{title}</span>
          </h6>
          <div
            className="d-flex align-items-center gap-2 transition-all"
            onClick={() => handleClick(id)}
          >
            <span>
              {isStarred[id] ? <FaStar size={20} className="text-warning" /> : <FaRegStar size={20} />}
            </span>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold">📌 Note: {details}</h5>
          <div className="d-flex justify-content-between mt-3">
            <div className="badge bg-primary-subtle text-dark p-2">
              <FaList className="me-2" /> Lists: {list_count}
            </div>
            <div className="badge bg-success-subtle text-dark p-2">
              <FaTasks className="me-2" /> Tasks: {task_count}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted d-flex align-items-center">
              <FaCalendarAlt className="me-2 text-primary" />
              Created: {created_at ? new Date(created_at).toLocaleDateString() : "ยังไม่มีการใช้งาน"}
            </small>
            <small className="text-muted d-flex align-items-center">
              <FaCalendarAlt className="me-2 text-success" />
              Updated: {board_at ? new Date(board_at).toLocaleDateString() : "ยังไม่มีการใช้งาน"}
            </small>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-danger d-flex align-items-center gap-2"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => setConfirmDeleteId(id)}
            >
              <FaTrash /> <span>Delete</span>
            </button>
            <div
              className="btn btn-outline-success d-flex align-items-center gap-2"
              onClick={() => handleJoinBoard(id)}
            >
              <AiOutlineArrowRight /> <span>Go to Board</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardWorkspace;
