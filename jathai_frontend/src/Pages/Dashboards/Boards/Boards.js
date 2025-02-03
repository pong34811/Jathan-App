import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline, IoFolderOpen } from "react-icons/io5";

import CreateModal from "./ModalsBoards/CreateModal";
import EditModal from "./ModalsBoards/EditModal";
import DeleteModal from "./ModalsBoards/DeleteModal";
import useBoards from "./hooks/useBoards";
import { URL_AUTH } from "../../../Apis/ConfigApis";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

function Boards({ id }) {
  const [editBoard, setEditBoard] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate(); // hook สำหรับการเปลี่ยนเส้นทาง
  const [searchTerm, setSearchTerm] = useState("");  
  const { boards, loading } = useBoards(searchTerm);
  
  const handleSave = (newBoard) => {
    console.log("New board created:", newBoard);
    // Refresh board list or update state if needed
  };

  const handleJoinBoard = async (boardId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    if (!boardId) {
      console.error("Board ID is undefined");
      return; // หยุดการทำงานหากไม่พบ id
    }

    try {
      // ส่ง request เพื่ออัปเดต jointoboard_at
      const response = await fetch(`${URL_AUTH.BoardAPI}${boardId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ board_at: new Date().toISOString() }),
      });

      if (!response.ok) {
        throw new Error(`Error updating board: ${response.status}`);
      }

      // หลังจากที่อัปเดตข้อมูลเสร็จแล้ว เราจะเปลี่ยนเส้นทางไปที่ Board
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("Error during join board:", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4" >
        <h3 className="fw-bold text-primary">📋 YOUR WORKSPACES</h3>
        <div className="d-flex gap-2" >
          {/* Search Input */}
          <input
            type="text"
            className="form-control"
            placeholder="🔍 ค้นหา Board..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // ✅ ตรวจสอบว่าค่าถูกเปลี่ยน
            style={{width : "40vh"}}
          />
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            data-bs-toggle="modal"
            data-bs-target="#createBoardModal"
            disabled={loading}
            
          >
            <IoAddCircleOutline size={20} /> <span>Create Board</span>
          </button>
        </div>
      </div>

      {/* Board Cards */}
      <div className="row g-3 mb-4">
        {boards.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>
              ไม่พบข้อมูลในระบบ กรุณากดปุ่ม <strong>Create</strong> เพื่อสร้าง
              Board ของคุณ
            </p>
          </div>
        ) : (
          boards.map(
            ({ id, title, list_count, task_count, created_at, board_at }) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
                <div className="card shadow-lg border-0 rounded-3 overflow-hidden h-100">
                  <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h6
                      className="mb-0 text-truncate"
                      style={{ maxWidth: "calc(100% - 45px)" }}
                    >
                      <IoFolderOpen size={20} className="me-2" /> {title}
                    </h6>

                    <button
                      className="btn btn-outline-light rounded-md p-2 d-flex align-items-center gap-2 transition-all"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => setEditBoard(id)}
                      style={{ transition: "all 0.3s ease" }}
                    >
                      <FaEdit size={20} />
                      <span className="d-none d-sm-inline">Edit</span>
                    </button>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="badge bg-light text-dark">
                        Lists: {list_count}
                      </div>
                      <div className="badge bg-light text-dark">
                        Tasks: {task_count}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <small className="text-muted">
                        Created:{" "}
                        {created_at
                          ? new Date(created_at).toLocaleDateString()
                          : "ยังไม่มีการใช้งาน"}
                      </small>
                      <small className="text-muted">
                        Updated:{" "}
                        {board_at
                          ? new Date(board_at).toLocaleDateString()
                          : "ยังไม่มีการใช้งาน"}
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
                        onClick={() => handleJoinBoard(id)} // ส่ง id ไปที่ handleJoinBoard
                      >
                        <AiOutlineArrowRight /> <span>Go to Board</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* Modals */}
      <CreateModal id="createBoardModal" onSave={handleSave} />
      <EditModal id="editModal" boardId={editBoard} onSave={setEditBoard} />
      <DeleteModal id="deleteModal" boardId={confirmDeleteId} />
    </div>
  );
}

export default Boards;
