import React, { useState, useEffect } from "react";
import { URL_AUTH } from "../../../Apis/ConfigApis";

const CreateModal = ({ id, onSave }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // ดึง userId เมื่อ component ถูกโหลด
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          console.error("Access token not found");
          return;
        }

        const response = await fetch(URL_AUTH.UsersAPI, {
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

        const userData = await response.json();
        console.log("Logged-in user:", userData);
        setUserId(userData.pk); // ตั้งค่า userId
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(URL_AUTH.BoardAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, user: userId }), // เพิ่ม userId ไปใน body
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Board created:", data);
      onSave(data); // ส่งค่าใหม่กลับไปยัง parent component

      window.location.reload();
    } catch (error) {
      console.error("Error creating board:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Board</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

export default CreateModal;
