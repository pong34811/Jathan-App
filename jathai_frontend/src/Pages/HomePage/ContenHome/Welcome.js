import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    // กำหนดข้อมูล demo credentials
    const credentials = {
      email: "Demo@gmail.com",
      password: "Demo@1234",
    };

    try {
      // ส่งคำร้องไปที่ API สำหรับ login
      const response = await fetch("https://api.janhai.space/dj-rest-auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // ตัวอย่าง: เก็บ token ใน localStorage
      localStorage.setItem("access", data.access);

      // เปลี่ยนไปที่หน้า /lists/16 เมื่อ login สำเร็จ
      navigate("/dashboard/");
    } catch (error) {
      console.error("Error during demo login:", error);
      // สามารถเพิ่มการแสดงข้อความแจ้งเตือนหรือจัดการ error เพิ่มเติมได้ที่นี่
    }
  };

  return (
    <div
      className="p-5 mb-4"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <div className="container text-center py-5 text-white">
        <h1
          className="display-4 fw-bold mb-3"
          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
        >
          ยินดีต้อนรับสู่ <strong>Jathai App</strong>
        </h1>
        <p
          className="col-lg-8 mx-auto fs-5"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          ปฏิวัติการจัดการงานของคุณด้วย <strong>Jathai App</strong> ที่ช่วยให้ทีมของคุณทำงานได้อย่างมีประสิทธิภาพ
          ด้วยอินเตอร์เฟซที่ใช้งานง่ายและดีไซน์ที่ทันสมัย
        </p>

        {/* ใช้ปุ่มแทน Link เพื่อให้สามารถทำการ login ก่อนเปลี่ยนหน้า */}
        <button
          onClick={handleDemoLogin}
          className="btn btn-light btn-lg mt-4 px-4 shadow-sm fw-bold"
          style={{
            transition: "background-color 0.3s, transform 0.3s",
            display: "inline-block",
            textDecoration: "none",
            color: "black",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ทดลองใช้งาน
        </button>
      </div>
    </div>
  );
}

export default Welcome;