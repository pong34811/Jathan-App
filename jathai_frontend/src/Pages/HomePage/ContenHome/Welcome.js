import React from "react";

function Welcome() {
    return (
<div
  className="p-5 mb-4 "
  style={{
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
  }}
>
  <div className="container text-center py-5 text-white">
    <h1 className="display-4 fw-bold mb-3" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}>
      ยินดีต้อนรับสู่ <strong>Jathai App</strong>
    </h1>
    <p className="col-lg-8 mx-auto fs-5" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
      ปฏิวัติการจัดการงานของคุณด้วย <strong>Jathai App</strong> ที่ช่วยให้ทีมของคุณทำงานได้อย่างมีประสิทธิภาพ
      ด้วยอินเตอร์เฟซที่ใช้งานง่ายและดีไซน์ที่ทันสมัย
    </p>
    <button
      className="btn btn-light btn-lg mt-4 px-4 shadow-sm fw-bold"
      type="button"
      style={{
        transition: "background-color 0.3s, transform 0.3s"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#f8f9fa";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={e => {
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
