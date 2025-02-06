import React from "react";

function About() {
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fw-bold text-primary">
              จัดการงานอย่างมีประสิทธิภาพด้วยระบบที่เข้าใจง่าย
            </h3>
            <p className="text-muted">
              Sabai App นำเสนอวิธีการจัดการโครงการและงานแบบภาพรวม สร้างบอร์ด
              รายการ และการ์ดเพื่อจัดระเบียบและจัดลำดับความสำคัญของงาน
              ได้อย่างยืดหยุ่นและมีประสิทธิภาพ
            </p>
            <p className="text-muted">
              ไม่ว่าคุณจะทำงานคนเดียวหรือทำงานเป็นทีม Sabai App
              สามารถปรับให้เข้ากับรูปแบบการทำงานของคุณ ลากและวางงานระหว่างรายการ
              เพิ่มรายละเอียด และติดตามความคืบหน้าได้ในที่เดียว
              ด้วยอินเตอร์เฟซที่ได้แรงบันดาลใจจาก Trello
            </p>
            <button className="btn btn-primary mt-3">เริ่มต้นใช้งาน</button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/logo_about.webp"
              alt="Sabai App Interface"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
