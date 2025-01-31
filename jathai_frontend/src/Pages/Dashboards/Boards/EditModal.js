import React, { useState, useEffect } from "react";
import { URL_AUTH } from "../../../Apis/ConfigApis";

const EditModal = ({ id, boardId, onSave }) => {
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBoardTitle = async () => {
      if (!boardId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          console.error("Access token not found");
          return;
        }

        const response = await fetch(`${URL_AUTH.BoardAPI}${boardId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setNewTitle(data.title); // ตั้งค่า title จากข้อมูลที่ดึงมา
      } catch (error) {
        console.error("Error fetching board title:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardTitle();
  }, [boardId]);

  const handleSave = async () => {
    if (!boardId) {
      console.error("Board ID is missing!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(`${URL_AUTH.BoardAPI}${boardId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Board updated:", data);
      onSave(newTitle); // ส่งค่าใหม่กลับไปยัง parent component

      window.location.reload(); 

    } catch (error) {
      console.error("Error updating board:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Board ID: {boardId}</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading} data-bs-dismiss="modal">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;