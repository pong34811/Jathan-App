import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // ใช้ Icon เพิ่มความน่าสนใจ
import "../../../css/TimeLine.css";

function TimeLine() {
  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Timeline</h2>
        <ul className="timeline">
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">11 กรกฎาคม 2024</time>
              <p>
                เริ่มต้นโครงการพัฒนา Sabai App - แอปพลิเคชันจัดการงานและโปรเจค
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">20 สิงหาคม 2024</time>
              <p>
                พัฒนาส่วน Backend ด้วย Python และ Django REST Framework เพื่อสร้าง API สำหรับจัดการข้อมูล
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">16 ตุลาคม 2024</time>
              <p>
                พัฒนาระบบ Backend เสร็จสมบูรณ์ พร้อมทดสอบการทำงานของ API
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">18 พฤศจิกายน 2024</time>
              <p>
                เริ่มพัฒนาส่วน Frontend ด้วย React 18 สร้างส่วนติดต่อผู้ใช้ที่ทันสมัยและใช้งานง่าย
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">20 ธันวาคม 2024</time>
              <p>
                พัฒนาระบบ Frontend เสร็จสมบูรณ์ พร้อมเชื่อมต่อกับ Backend API
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">25 ธันวาคม 2024</time>
              <p>
                ปรับแต่ง UI/UX เพื่อเพิ่มประสบการณ์การใช้งานที่ดียิ่งขึ้น
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">29 ธันวาคม 2024</time>
              <p>
                ทดสอบระบบแบบบูรณาการและแก้ไขข้อบกพร่อง พร้อมสำหรับการใช้งานจริง
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>

          {/* อัปเดต Timeline ถึง 6 กุมภาพันธ์ 2568 */}
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">6 มกราคม 2025</time>
              <p>
                เปิดให้บริการเบต้า (Beta) แก่ผู้ใช้บางกลุ่ม เพื่อรับฟีดแบ็คและปรับปรุง
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">15 มกราคม 2025</time>
              <p>
                วิเคราะห์ฟีดแบ็คจากผู้ใช้เบต้าและทำการปรับปรุง UI/UX รวมถึงการแก้ไขบั๊ก
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">20 มกราคม 2025</time>
              <p>
                เปิดตัวฟีเจอร์ใหม่ "การจัดการงานร่วมกัน" เพื่อเพิ่มประสิทธิภาพในการทำงานเป็นทีม
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">1 กุมภาพันธ์ 2025</time>
              <p>
                ปรับปรุงระบบฐานข้อมูลเพื่อรองรับการขยายตัวและเพิ่มประสิทธิภาพในการจัดการข้อมูล
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
          <li className="timeline-item">
            <div className="timeline-content bg-white">
              <time className="text-primary">6 กุมภาพันธ์ 2025</time>
              <p>
                ระบบพร้อมสำหรับการเปิดใช้งานเต็มรูปแบบ (Official Launch) พร้อมการสนับสนุนและการตลาด
              </p>
              <FaCheckCircle className="text-success" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TimeLine;
