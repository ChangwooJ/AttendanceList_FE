import React, { useState } from "react";

import "../css/Admin.css";

const Admin = ({onAuth}) => {
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "0360") {
            onAuth(true);
        } else {
            alert("비밀번호가 일치하지 않습니다.");
            onAuth(false);
        }
    };

    return (
        <form className="AuthForm" onSubmit={handleSubmit}>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
            />
            <button type="submit">확인</button>
        </form>
    )
}

export default Admin;