import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { URL_AUTH } from "../../../Apis/ConfigApis";

function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editBoard, setEditBoard] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchBoards = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(`${URL_AUTH.BoardAPI}?user=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Fetched boards:", data);

      setBoards(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setBoards([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(URL_AUTH.UsersAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        return null;
      }

      const userData = await response.json();
      console.log("Logged-in user:", userData);
      return userData.pk; // ดึงค่า pk (user id)
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userId = await fetchUser();
      if (userId) {
        fetchBoards(userId);
      }
    };

    loadUserData();
  }, []);

  const handleDeleteBoard = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(`${URL_AUTH.BoardAPI}${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      setBoards((prev) => prev.filter((board) => board.id !== id));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Failed to delete board:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSaveBoard = (newBoard) => {
    setBoards((prev) => [...prev, newBoard]);
  };

  const handleEditBoard = (updatedTitle) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === editBoard ? { ...board, title: updatedTitle } : board
      )
    );
    setEditBoard(null);
  };

  return (
    <div>
      <div className="col d-flex justify-content-start align-items-center mb-3 grid gap-3">
        <h3 className="mb-0">Boards</h3>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createBoardModal"
          disabled={loading}
        >
          Create Board
        </button>
      </div>
      <div className="row">
        {boards.length === 0 ? (
          <div className="col-12 text-center">
            <p>
              ไม่พบข้อมูลในระบบ กรุณาทำการกดปุ่ม Create เพื่อสร้าง Board
              ของคุณด้วยค่ะ
            </p>
          </div>
        ) : (
          boards.map(({ id, title, created_at, updated_at }) => (
            <div className="col col-md-4 col-sm-12 mb-3" key={id}>
              <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{title}</h6>
                  <Link className="btn btn-outline-light">
                    <IoAddCircle size={30} />
                  </Link>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{title}</h5>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setConfirmDeleteId(id)}
                    >
                      <FaTrash className="me-2" /> Delete
                    </button>
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => setEditBoard(id)}
                    >
                      <FaEdit className="me-2" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateModal id="createBoardModal" onSave={handleSaveBoard} />
      <EditModal id="editModal" boardId={editBoard} onSave={handleEditBoard} />
      <DeleteModal id="deleteModal" boardId={confirmDeleteId} onDelete={handleDeleteBoard} />
    </div>
  );
}

export default Boards;