import React from 'react';
import Boardspage from './Boards/Boards';

function Pages() {
  return (
    <div className="container ">
      <div className="text-center mb-4 mt-5">
        <h1 className="fw-bold text-primary">📌 My Board Overview</h1>
        <p className="text-muted">
          "ที่นี่คุณสามารถดูและจัดการบอร์ดทั้งหมดของคุณได้ในที่เดียว
          จัดระเบียบ ติดตามความคืบหน้า
          และทำงานร่วมกันในโปรเจกต์ของคุณได้อย่างสะดวกและมีประสิทธิภาพ."
        </p>
      </div>
      <Boardspage />
    </div>
  );
}

export default Pages;
