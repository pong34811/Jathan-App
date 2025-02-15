import { useState } from "react";
import useUsers from "../../Dashboards/Boards/hooks/useUsers";

const useDisconnectLine = () => {
  const { user, refreshUser } = useUsers();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDisconnectLine = async () => {
    if (!user || !user.id) {
      console.error("User data is missing");
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await fetch(`https://api.janhai.space/user/${user.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          line_user_id: null,
          email: user.email || "",
          first_name: user.first_name || "",
        }),
      });

      if (response.ok) {
        await refreshUser();
      } else {
        throw new Error("Failed to disconnect LINE account");
      }
    } catch (error) {
      console.error("Error disconnecting LINE account:", error);
    } finally {
      setIsProcessing(false);
      window.location.reload();
    }
  };

  return { handleDisconnectLine, isProcessing };
};

export default useDisconnectLine;
