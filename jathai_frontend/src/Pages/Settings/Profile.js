import { useEffect, useState } from "react";
import useUsers from "../Dashboards/Boards/hooks/useUsers";
import { FaLine } from "react-icons/fa";
import handleLineLogin from "./controller/handleLineLogin";
import DeleteLineModal from "./modal/DeleteLineModal";

function Profile() {
  const { user, loading, refreshUser } = useUsers();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleLineCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");

      if (error || !code || !user?.id) return;

      setIsConnecting(true);
      try {
        const response = await fetch("https://api.janhai.space/line/callback/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, userId: user.id }),
        });
        const data = await response.json();
        if (data.success) {
          // After successful login, refresh user data
          await refreshUser();
        }
        // Refresh page after 3 seconds
      } catch (error) {
        console.error("Error during LINE login:", error);
      } finally {
        setIsConnecting(false);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        ); // Clear URL parameters
        window.location.reload();
      }
    };

    handleLineCallback();
  }, [user?.id, refreshUser]);

  if (loading || isConnecting) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          {isConnecting ? "Connecting LINE account..." : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">User Profile</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>ID:</strong> {user.id}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>First Name:</strong> {user.first_name}
              </li>
              <li className="list-group-item">
                <strong>Last Name:</strong> {user.last_name}
              </li>
              <li className="list-group-item">
                <strong>Date Joined:</strong>{" "}
                {new Date(user.date_joined).toLocaleString("th-TH")}
              </li>
              <li className="list-group-item">
                <strong>Last Login:</strong>{" "}
                {new Date(user.last_login).toLocaleString("th-TH")}
              </li>
              <li className="list-group-item">
                <strong>Line User ID:</strong>{" "}
                {user.line_user_id ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{user.line_user_id}</span>
                    <button
                      className="btn btn-danger btn-sm "
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteLineModal"
                    >
                      Disconnect LINE
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-success d-flex align-items-center"
                    onClick={handleLineLogin}
                  >
                    <FaLine className="me-2" /> Connect LINE Account
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
        <DeleteLineModal id="DeleteLineModal" />
      </div>
    </>
  );
}

export default Profile;
