import React, { useState } from "react";
import { FaClipboardList, FaTasks, FaLayerGroup } from "react-icons/fa";

const LineNotify = () => {
  const [settings, setSettings] = useState({
    boards: false,
    tasks: false,
    lists: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h5 className="mb-0">🔔 Line Notify Settings</h5>
        </div>
        <div className="card-body">
          {/* Bootstrap Nav Tabs */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="boards-tab"
                data-bs-toggle="tab"
                data-bs-target="#boards"
                type="button"
                role="tab"
              >
                <FaLayerGroup className="me-2" /> Boards
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="tasks-tab"
                data-bs-toggle="tab"
                data-bs-target="#tasks"
                type="button"
                role="tab"
              >
                <FaTasks className="me-2" /> Tasks
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="lists-tab"
                data-bs-toggle="tab"
                data-bs-target="#lists"
                type="button"
                role="tab"
              >
                <FaClipboardList className="me-2" /> Lists
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content mt-3">
            {/* Boards Tab */}
            <div className="tab-pane fade show active" id="boards" role="tabpanel">
              <h6>ตั้งค่าการแจ้งเตือนสำหรับ Boards</h6>
              <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                <span>เปิดใช้งานแจ้งเตือน</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.boards}
                    onChange={() => toggleSetting("boards")}
                  />
                </div>
              </div>
            </div>

            {/* Tasks Tab */}
            <div className="tab-pane fade" id="tasks" role="tabpanel">
              <h6>ตั้งค่าการแจ้งเตือนสำหรับ Tasks</h6>
              <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                <span>เปิดใช้งานแจ้งเตือน</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.tasks}
                    onChange={() => toggleSetting("tasks")}
                  />
                </div>
              </div>
            </div>

            {/* Lists Tab */}
            <div className="tab-pane fade" id="lists" role="tabpanel">
              <h6>ตั้งค่าการแจ้งเตือนสำหรับ Lists</h6>
              <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                <span>เปิดใช้งานแจ้งเตือน</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.lists}
                    onChange={() => toggleSetting("lists")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineNotify;
