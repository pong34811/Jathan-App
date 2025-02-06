import React from "react";
import { IoClipboardSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { BiTask } from "react-icons/bi";

function Service() {
  return (
    <>
      <div className="container py-5 text-center bg-light">
        <h2 className="fw-bold mb-4 text-primary">คุณสมบัติเด่น</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg p-4 text-center" style={{ height: "100%" }}>
              <span className="text-primary display-4 mb-3">
                <IoClipboardSharp />
              </span>
              <h4 className="fw-bold">บอร์ดที่ยืดหยุ่น</h4>
              <p className="text-muted">
                สร้างบอร์ดไม่จำกัดเพื่อจัดระเบียบโครงการหรือเวิร์กโฟลว์ต่างๆ ปรับแต่งรายการ เพิ่มลำดับความสำคัญและติดแท็กให้กับแต่ละงาน รองรับการลากและวางเพื่อจัดการสถานะงานได้ง่ายดาย พร้อมการปรับแต่งที่รองรับการทำงานของทุกทีม
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg p-4 text-center" style={{ height: "100%" }}>
              <span className="text-success display-4 mb-3">
                <GrUpdate />
              </span>
              <h4 className="fw-bold">อัพเดทแบบเรียลไทม์</h4>
              <p className="text-muted">
                ติดตามการเปลี่ยนแปลงอย่างทันทีในทุกการกระทำกับทีมของคุณ ไม่ว่าจะเป็นการย้ายการ์ด เพิ่มความคิดเห็น หรืออัพเดทสถานะงาน คุณจะเห็นการเปลี่ยนแปลงทั้งหมดแบบเรียลไทม์
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg p-4 text-center" style={{ height: "100%" }}>
              <span className="text-warning display-4 mb-3">
                <BiTask />
              </span>
              <h4 className="fw-bold">จัดการงาน</h4>
              <p className="text-muted">
                แบ่งโครงการใหญ่เป็นงานย่อยที่จัดการได้ง่าย เพิ่มคำอธิบาย กำหนดวันครบกำหนด และแนบไฟล์ทั้งหมดที่เกี่ยวข้องไว้ในที่เดียวเพื่อเพิ่มประสิทธิภาพในการทำงานให้กับทีมของคุณ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
