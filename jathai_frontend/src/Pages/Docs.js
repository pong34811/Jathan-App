import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Docs() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">คู่มือการใช้งาน Sabai App</h1>

      {/* วิธีการ Login */}
      <div className="row mb-5">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>1. วิธีการ Login เข้าสู่ระบบ</h5>
            </div>
            <div className="card-body">
              <p>คุณสามารถเข้าสู่ระบบด้วยวิธีการดังนี้:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Login แบบปกติ:</strong> กรอกอีเมล์และรหัสผ่านของคุณเพื่อเข้าสู่ระบบ
                </li>
                <li className="list-group-item">
                  <strong>Login ด้วย Google:</strong> คลิกที่ปุ่ม "Login with Google" และเลือกบัญชี Google ของคุณ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* วิธีการสมัครผู้ใช้ */}
      <div className="row mb-5">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>2. วิธีการสมัครผู้ใช้</h5>
            </div>
            <div className="card-body">
              <p>เพื่อสมัครสมาชิกใหม่กรุณาทำตามขั้นตอนดังนี้:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">กรอกข้อมูลพื้นฐาน เช่น ชื่อผู้ใช้, อีเมล์, และรหัสผ่าน</li>
                <li className="list-group-item">ยืนยันข้อมูลและคลิก "สมัครสมาชิก"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* วิธีการใช้งานหน้า Dashboard */}
      <div className="row mb-5">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>3. วิธีการใช้งานหน้า Dashboard</h5>
            </div>
            <div className="card-body">
              <p>หน้า Dashboard ช่วยให้คุณสามารถจัดการโปรเจกต์ต่าง ๆ ได้:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>สร้าง Board ใหม่:</strong> คลิกที่ปุ่ม "สร้าง Board" เพื่อเพิ่มตารางงานใหม่
                </li>
                <li className="list-group-item">
                  <strong>แก้ไข Board:</strong> เลือก Board ที่ต้องการแก้ไขแล้วคลิกที่ปุ่ม "แก้ไข"
                </li>
                <li className="list-group-item">
                  <strong>ลบ Board:</strong> เลือก Board ที่ต้องการลบแล้วคลิกที่ปุ่ม "ลบ"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* วิธีการใช้งานหน้า Todo-List */}
      <div className="row mb-5">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>4. วิธีการใช้งานหน้า Todo-List</h5>
            </div>
            <div className="card-body">
              <p>หน้า Todo-List ช่วยให้คุณสามารถจัดการรายการงานได้:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>สร้าง List ใหม่:</strong> คลิกที่ปุ่ม "สร้าง List" เพื่อเพิ่มรายการงานใหม่
                </li>
                <li className="list-group-item">
                  <strong>สร้าง Task ใหม่:</strong> คลิกที่ปุ่ม "สร้าง Task" ภายใน List ที่เลือก
                </li>
                <li className="list-group-item">
                  <strong>แก้ไข List หรือ Task:</strong> คลิกที่ปุ่ม "แก้ไข" เพื่อทำการปรับปรุงข้อมูล
                </li>
                <li className="list-group-item">
                  <strong>ลบ List หรือ Task:</strong> คลิกที่ปุ่ม "ลบ" เพื่อทำการลบรายการงานหรือ Task
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ขั้นตอนตั้งค่า Line Notify */}
      <div className="row mb-5">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>5. ขั้นตอนตั้งค่าเปิดใช้งาน Line</h5>
            </div>
            <div className="card-body">
              <p>เพื่อเปิดใช้งานการแจ้งเตือนผ่าน Line กรุณาทำตามขั้นตอนต่อไปนี้:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">1. เข้า <Link to="/settings/" target="_blank" rel="noopener noreferrer">Settings</Link></li>
                <li className="list-group-item">2. Login ด้วยบัญชี Line เพื่อทำการผูกบัญชี Line กับระบบ</li>
                <li className="list-group-item">3. หลังจาก Login เสร็จแล้ว หน้าต่างตั้งค่าเปิด-ปิด ระบบแจ้งเตือนผ่าน Line จะปรากฏขึ้น</li>
                <li className="list-group-item">4. เลือกเปิดหรือปิดการแจ้งเตือนตามต้องการ และบันทึกการตั้งค่า</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ปุ่มกลับไปยังหน้าแรก */}
      <div className="text-center">
        <Link to="/" className="btn btn-primary mt-4">
          <FaArrowLeft className="me-2" /> กลับไปยังหน้าหลัก
        </Link>
      </div>
    </div>
  );
}

export default Docs;
