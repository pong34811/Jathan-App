import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline ,IoFolderOpen } from "react-icons/io5";
import { Link } from "react-router-dom";
import CreateModal from "./ModalsBoards/CreateModal";
import EditModal from "./ModalsBoards/EditModal";
import DeleteModal from "./ModalsBoards/DeleteModal";
import useBoards from "./hooks/useBoards";
import { URL_AUTH } from "../../../Apis/ConfigApis";
import { AiOutlineArrowRight } from 'react-icons/ai';

function Boards() {
  const [editBoard, setEditBoard] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { boards, loading } = useBoards(); // ใช้ Custom Hook
 

  return (
    <div>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">📋 Boards</h3>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#createBoardModal"
          disabled={loading}
        >
          <IoAddCircleOutline size={20} /> <span>Create Board</span>
        </button>
      </div>

      {/* Board Cards */}
      <div className="row g-3">
        {boards.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>ไม่พบข้อมูลในระบบ กรุณากดปุ่ม <strong>Create</strong> เพื่อสร้าง Board ของคุณ</p>
          </div>
        ) : (
          boards.map(({ id, title, list_count, task_count, created_at, updated_at }) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
              <div className="card shadow-lg border-0 rounded-3 overflow-hidden h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 text-truncate" style={{ maxWidth: 'calc(100% - 45px)' }}>
                    <IoFolderOpen size={20} className="me-2" /> {title}
                  </h6>

                  <button
                    className="btn btn-outline-light rounded-md p-2 d-flex align-items-center gap-2 transition-all"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => setEditBoard(id)}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <FaEdit size={20} />
                    <span className="d-none d-sm-inline">Edit</span>
                  </button>
                </div>

                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="badge bg-light text-dark">Lists: {list_count}</div>
                    <div className="badge bg-light text-dark">Tasks: {task_count}</div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <small className="text-muted">Created: {new Date(created_at).toLocaleDateString()}</small>
                    <small className="text-muted">Updated: {new Date(updated_at).toLocaleDateString()}</small>
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

                    <Link to={`/board/${id}`} className="btn btn-outline-success d-flex align-items-center gap-2">

                      <AiOutlineArrowRight /> <span>Go to Board</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>


      {/* Modals */}
      <CreateModal id="createBoardModal" />
      <EditModal id="editModal" boardId={editBoard} onSave={setEditBoard}  />
      <DeleteModal id="deleteModal" boardId={confirmDeleteId} />
    </div>


  );
}

export default Boards;