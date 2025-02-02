import { useState, useEffect } from "react";
import { URL_AUTH } from "../../../../Apis/ConfigApis";

const useBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return { boards, loading };
};

export default useBoards;
