import React from "react";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { URL_AUTH } from "../../../Apis/ConfigApis";

// const exampleBoards = [
//   { id: 1, title: "Project Alpha" },
//   { id: 2, title: "Project Beta" },
//   { id: 3, title: "Project Gamma" },
//   { id: 4, title: "Project Alpha" },
//   { id: 5, title: "Project Beta" },
//   { id: 6, title: "Project Gamma" },
// ];

function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  
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
  

  // // Simulate fetching data
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setBoards(exampleBoards);
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  const handleSave = (newTitle) => {
    // ทำสิ่งที่ต้องการเมื่อบันทึกเสร็จ เช่น อัปเดตข้อมูลบน UI
    console.log("New title:", newTitle);
    // ถ้าต้องการ, คุณสามารถทำการรีเฟรชข้อมูลใหม่ หรือส่งข้อมูลใหม่ไปยัง backend
  };
  
  return (
    <div>
      <div className="col d-flex justify-content-start align-items-center mb-3 grid gap-3">
        <h3 className="mb-0">Boards</h3>
        <button className="btn btn-primary " disabled={loading}>
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
                {/* Header */}
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{title}</h6>
                  <Link className="btn btn-outline-light">
                    <IoAddCircle size={30} />
                  </Link>
                </div>

                {/* Body */}
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{title}</h5>

                  {/* Actions */}
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-outline-danger d-flex align-items-center"data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <FaTrash className="me-2" /> Delete
                    </button>
                    <button className="btn btn-outline-success d-flex align-items-center"data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => setItem(id)} >
                      <FaEdit className="me-2" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* import Modals */}
      <DeleteModal id="deleteModal" title={`Delete Board ID: ${item}`}  />
      <EditModal id="editModal" boardId={item} onSave={handleSave} />

    </div>
  );
}

export default Boards;
