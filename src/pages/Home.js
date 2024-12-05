import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div>출석자 분류 시스템</div>
            <button className="attendance main_button" onClick={() => navigate("/attendance")}>출석자</button>
            <button className="userlist main_button" onClick={() => navigate("/userlist")}>전체 명단</button>
            <button className="setting main_button" onClick={() => navigate("/setting")}>설정</button>
        </React.Fragment>
    );
}

export default Home;