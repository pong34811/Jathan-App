import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // เพิ่มไอคอนจาก react-icons

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 text-center">
          {/* เกี่ยวกับเรา */}
          <div className="col mb-4">
            <h5 className="fw-bold text-uppercase">เกี่ยวกับเรา</h5>
            <p>
              Jathai App
              คือแอปพลิเคชันที่ออกแบบมาเพื่อช่วยให้การจัดการงานและโปรเจคต่าง ๆ
              เป็นเรื่องง่าย และสะดวกสบาย
            </p>
          </div>

          {/* ลิงก์ที่สำคัญ */}
          <div className="col mb-4">
            <h5 className="fw-bold text-uppercase">ลิงก์ที่สำคัญ</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  เกี่ยวกับ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* ติดตามเรา */}
          <div className="col mb-4">
            <h5 className="fw-bold text-uppercase">ติดตามเรา</h5>
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="mx-2">
                <Link
                  to="https://facebook.com"
                  className="text-white"
                  target="_blank"
                >
                  <FaFacebook className="me-2" />
                  Facebook
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="https://twitter.com"
                  className="text-white"
                  target="_blank"
                >
                  <FaTwitter className="me-2" />
                  Twitter
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="https://instagram.com"
                  className="text-white"
                  target="_blank"
                >
                  <FaInstagram className="me-2" />
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-light" />

        <div className="text-center">
          <p className="mb-0">&copy; 2025 Jathai App. All Rights Reserved.</p>
          <p className="text-muted">Powered by Jathai Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
