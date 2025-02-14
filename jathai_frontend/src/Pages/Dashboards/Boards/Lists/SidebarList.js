import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaClipboardList, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import useBoards from "../hooks/useBoards";

function SidebarList() {
  const { boards, loading } = useBoards();
  const location = useLocation();
  const navigate = useNavigate();

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem("access"); // ลบ token
    navigate("/login"); // ไปที่หน้า login
  };

  return (
    <>
      <div className="position-sticky py-4" style={{width : "200px"}}>
        {/* ปุ่มย้อนกลับ */}
        <div className="px-3 mb-3">
          <button
            className="btn btn-secondary w-100 d-flex align-items-center"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft className="me-2" /> Back
          </button>
        </div>
        <hr className="text-white " />
        <h5 className="text-white px-3">Your boards</h5>
        <ul className="nav flex-column px-3">
  {loading ? (
    <li className="nav-item text-white px-3">Loading...</li>
  ) : (
    boards.map((board) => (
      <li className="nav-item overflow-hidden" key={board.id}>
        <Link
          to={`/lists/${board.id}`}
          className={`nav-link d-flex align-items-center text-white px-3 py-2 
                      ${
                        location.pathname === `/lists/${board.id}`
                          ? "active bg-primary"
                          : "hover-bg-light"
                      }`}
                      style={{ width: "180px"}}
        >
          <FaClipboardList className="me-2" />
          <span className="w-100 text-truncate">{board.title}</span>
        </Link>
      </li>
    ))
  )}
</ul>

        <hr />
        {/* ปุ่ม Logout */}
        <div className="px-3 mt-4">
          <button
            className="btn btn-danger w-100 d-flex align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarList;
