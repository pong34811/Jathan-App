import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { URL_AUTH } from "../../../../Apis/ConfigApis";

// ฟังก์ชั่นสำหรับดึงข้อมูลผู้ใช้โดยใช้ user id ที่ได้จาก token
const fetchUser = async () => {
    try {
        const token = localStorage.getItem("access");
        if (!token) {
            console.error("ไม่พบ token");
            return null;
        }
        // Decode token เพื่อดึงข้อมูล user id (หรือ pk)
        const decoded = jwtDecode(token);
        const userPk = decoded.user_id || decoded.pk;
        if (!userPk) {
            console.error("ไม่พบข้อมูล user id ใน token");
            return null;
        }
        // สร้าง URL โดยต่อ user id เข้าไป เช่น http://localhost:8000/user/1/
        const url = `${URL_AUTH.UserDetailAPI}${userPk}/`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });



        const userData = await response.json();
        // console.log("Logged-in user:", userData);
        // // คืนค่าข้อมูลผู้ใช้ทั้งหมด
        return userData;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

// สร้าง custom hook useUsers เพื่อจัดการกับ state ของข้อมูลผู้ใช้และสถานะ loading
const useUsers = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUser();
            setUser(data);
            setLoading(false);
        };

        getUser();
    }, []);

    return { user, loading };
};

export default useUsers;
