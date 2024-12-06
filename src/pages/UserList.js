import axios from "axios";
import React, { useEffect, useState } from "react";
import UserManage from "../components/UserManage";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [newUser, setNewUser] = useState(false);

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
                    <>
                        <div key={index}>{index + 1}: {user.username} {user.color}</div>
                        <button onClick={() => deleteUser(user.username)}>x</button>
                    </>
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

    return (
        <React.Fragment>
            UserList
            <button onClick={() => {setNewUser(true);}}>입소자</button>
            {newUser && (<UserManage option={"insert"} />)}
            {userColors.map(color => (
                <div key={color}>
                    {filteringUser(color)}
                </div>
            ))}
        </React.Fragment>
    )
}

export default UserList;