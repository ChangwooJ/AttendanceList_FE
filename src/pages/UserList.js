import axios from "axios";
import React, { useEffect, useState } from "react";
import UserManage from "../components/UserManage";

import "../css/UserList.css";
import Admin from "../components/admin";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [auth, setAuth] = useState(false);

    const userColors = [...new Set(userList.map(user => user.color))];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('https://goyang0360.o-r.kr/api/userlist');
                setUserList(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    const filteringUser = (color) => {
        const filteredUsers = userList.filter(user => user.color === color);

        return (
            <div>
                {filteredUsers.map((user, index) => (
                    <div className="userlist_wrap">
                        <div key={index}>{index + 1}: {user.username} {user.color}</div>
                        {auth && (<button className="delete_bt" onClick={() => deleteUser(user.username)}>x</button>)}
                    </div>
                ))}
            </div>
        );
    };

    const deleteUser = async (username) => {
        try {
            await axios.delete(`https://goyang0360.o-r.kr/api/deleteUser/${username}`);
            setUserList(prevUserList => prevUserList.filter(user => user.username !== username));
            alert("삭제되었습니다.");
        } catch (error) {
            console.error("유저 삭제 실패:", error);    
        }
    };

    const colorMap = {
        "빨강색": "rgba(255, 0, 0, 0.3)",  // 빨강색 -> 빨간색 코드
        "파랑색": "rgba(0, 0, 255, 0.3)",  // 파랑색 -> 파란색 코드
        "은색": "rgba(192, 192, 192, 0.3)",    // 은색 -> 은색 코드
        "그 외": "rgba(0, 0, 0, 0.3)",
    };

    const adminManage = (auth) => {
        if(auth === true) {
            setAuth(true);
            setAdmin(false);
        }
    }

    return (
        <React.Fragment>
            <h4>UserList</h4>
            <button onClick={() => {setAdmin(true);}}>Admin Login</button>
            {auth && (<button onClick={() => {setNewUser(true);}}>입소자(유저 추가)</button>)}
            {admin && (<Admin onAuth={adminManage} />)}
            {newUser && (<UserManage option={"insert"} />)}
            {userColors.map(color => (
                <div className="color_wrap" key={color} style={{ backgroundColor: colorMap[color] || "rgba(255, 255, 255, 0.3)" }}>
                    {filteringUser(color)}
                </div>
            ))}
        </React.Fragment>
    )
}

export default UserList;