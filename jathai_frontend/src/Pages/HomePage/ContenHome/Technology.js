import React from "react";
import {
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoNodejs,
  IoLogoPython,
} from "react-icons/io";
import { IoLogoReact } from "react-icons/io5";
import { BiLogoDjango } from "react-icons/bi";
import { DiSqllite } from "react-icons/di";
import { BsBootstrap } from "react-icons/bs"; // เพิ่ม Icon สำหรับ Bootstrap
import "../../../css/Technology.css"

function Technology() {
  return (
    <div className="container py-5 text-center">
      <div className="row-clients-header mb-5">
        <h2 className="fw-bold text-primary">Technology Stack</h2>
      </div>

      <div className="row row-cols-2 row-cols-md-4 g-4">
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-primary">
              <IoLogoReact />
            </span>
            <h4 className="fw-bold">React</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-danger">
              <IoLogoHtml5 />
            </span>
            <h4 className="fw-bold">HTML5</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-primary">
              <IoLogoCss3 />
            </span>
            <h4 className="fw-bold">CSS3</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-success">
              <IoLogoNodejs />
            </span>
            <h4 className="fw-bold">Node.js</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-info">
              <IoLogoPython />
            </span>
            <h4 className="fw-bold">Python</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-success">
              <BiLogoDjango />
            </span>
            <h4 className="fw-bold">Django</h4>
          </div>
        </div>
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-muted">
              <DiSqllite />
            </span>
            <h4 className="fw-bold">SQLite</h4>
          </div>
        </div>

        {/* เพิ่ม Bootstrap */}
        <div className="col">
          <div className="card border-0 shadow-lg text-center p-4 tech-card">
            <span className="display-4 mb-3 text-info">
              <BsBootstrap />
            </span>
            <h4 className="fw-bold">Bootstrap</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technology;
