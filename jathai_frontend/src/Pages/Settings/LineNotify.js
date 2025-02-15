import React from "react";
import { FaTasks, FaLayerGroup } from "react-icons/fa";
import useUsers from "../Dashboards/Boards/hooks/useUsers";
import LineOAModal from "./modal/LineOAModal";

const LineNotify = () => {
  const { user, loading, refreshUser } = useUsers();

  const toggleSetting = async (key) => {
    if (!user) return;
    const API_URL = `https://api.janhai.space/user/${user.id}/`;
    const token = localStorage.getItem("access");

    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [key]: !user[key],
          email: user.email || "", // Add email field if missing
          first_name: user.first_name || "", // Add first_name field if missing
        }),
      });
      refreshUser(); // รีเฟรชข้อมูลผู้ใช้หลังจากอัปเดตการตั้งค่า
    } catch (err) {
      console.error("Error updating settings:", err);
    } finally {
      window.location.reload();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>ไม่สามารถโหลดข้อมูลผู้ใช้ได้</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h5 className="mb-0">🔔 Line Notify Settings</h5>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {[
              {
                id: "boards",
                icon: <FaLayerGroup className="me-2" />,
                label: "Boards",
              },
              {
                id: "tasks",
                icon: <FaTasks className="me-2" />,
                label: "Tasks",
              },

            ].map((tab, index) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                  id={`${tab.id}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                  role="tab"
                >
                  {tab.icon} {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content mt-3">
            {["board", "task"].map((category) => (
              <div
                key={category}
                className={`tab-pane fade ${
                  category === "board" ? "show active" : ""
                }`}
                id={`${category}s`}
                role="tabpanel"
              >
                <h6>ตั้งค่าการแจ้งเตือนสำหรับ {category}s</h6>
                {[
                  {
                    key: `is_notify_create_${category}`,
                    label: "แจ้งเตือนเมื่อสร้าง",
                  },
                  {
                    key: `is_notify_update_${category}`,
                    label: "แจ้งเตือนเมื่ออัปเดต",
                  },
                  {
                    key: `is_notify_delete_${category}`,
                    label: "แจ้งเตือนเมื่อลบ",
                  },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="d-flex align-items-center justify-content-between p-3 border rounded"
                  >
                    <span>{label}</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={user[key] || false}
                        onChange={() => toggleSetting(key)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button
            className="btn btn-success mt-3"
            data-bs-toggle="modal"
            data-bs-target="#lineOAModal"
          >
            Add LINE OA
          </button>
          </div>
        </div>
      </div>
      <LineOAModal />
    </div>
  );
};

export default LineNotify;
