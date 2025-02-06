import React from "react";

function Welcome() {
    return (
        <div className="p-5 mb-4 bg-gradient rounded-3" style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",}}>
            <div className="container text-center py-5">
                <h1 className="display-4 fw-bold">
                    ยินดีต้อนรับสู่ <strong>Sabai App</strong>
                </h1>
                <p className="col-lg-8 mx-auto fs-5 mt-3">
                    ปฏิวัติการจัดการงานของคุณด้วย <strong>Sabai App</strong> ที่ช่วยให้ทีมของคุณทำงานได้อย่างมีประสิทธิภาพ 
                    ด้วยอินเตอร์เฟซที่ใช้งานง่ายและดีไซน์ที่ทันสมัย
                </p>
                <button className="btn btn-light btn-lg mt-3 px-4 shadow-sm fw-bold" type="button">
                    ทดลองใช้งาน
                </button>
            </div>
        </div>
    );
}

export default Welcome;
