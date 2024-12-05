import React, { useState } from "react";
import axios from "axios";

const UserManage = ({ option }) => {
    const [userData, setUserData] = useState({
        username: '',
        color: '',
    });

    const change = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const uploadUser = () => {
        console.log(userData);
        if(option === 'insert') {
            axios.post('https://attendancelist-be-4b43ae319fcf.herokuapp.com//api/newuser', {
                username: userData.username,
                color: userData.color,
            })
                .then(() => {
                    alert('추가되었습니다.');
                    //navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <React.Fragment>
            <input 
                className="username" type="text" 
                name="username" placeholder="회원이름" 
                value={userData.username}
                onChange={change}
            />
            <select 
                name="color"
                value={userData.color}
                onChange={change}
            >
                <option value="">색상을 선택하세요</option>
                <option value="빨강색">빨강색</option>
                <option value="파랑색">파랑색</option>
                <option value="은색">은색</option>
                <option value="초록색">초록색</option>
                <option value="그 외">그 외</option>
            </select>
            <button onClick={() => uploadUser()}>완료</button>
        </React.Fragment>
    )
}

export default UserManage;