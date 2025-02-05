import { useState, useEffect } from "react";
import { URL_AUTH } from "../../../../Apis/ConfigApis";

const useBoards = (searchTerm = "") => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nonStarredBoards, setNonStarredBoards] = useState([]); // เพิ่ม state สำหรับบอร์ดที่ไม่ถูกดาว

    const fetchBoards = async (userId, search = "") => {
        setLoading(true);
        try {
            const token = localStorage.getItem("access");
            if (!token) {
                console.error("Access token not found");
                return;
            }

            const apiUrl = `${URL_AUTH.BoardAPI}?user=${userId}&search=${search}`;
            console.log("Fetching from API:", apiUrl); // ✅ Debug URL API

            const response = await fetch(apiUrl, {
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

    const fetchStarredBoards = async (userId, search = "") => {
        setLoading(true);
        try {
          const token = localStorage.getItem("access");
          if (!token) {
            console.error("Access token not found");
            return;
          }
    
          const apiUrl = `${URL_AUTH.BoardAPI}?user=${userId}&search=${search}&is_star=true`;
          const response = await fetch(apiUrl, {
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
          setNonStarredBoards(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching non-starred boards:", error);
          setNonStarredBoards([]);
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
                fetchBoards(userId, searchTerm); // ✅ ใช้ searchTerm
                fetchStarredBoards(userId, searchTerm); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบอร์ดที่ไม่ถูกดาว

            }
        };

        loadUserData();
    }, [searchTerm]); // ✅ เมื่อ searchTerm เปลี่ยน จะโหลดข้อมูลใหม่

    return { boards,nonStarredBoards, loading };
};

export default useBoards;
