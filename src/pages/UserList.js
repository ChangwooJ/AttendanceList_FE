import axios from "axios";
import React, { useEffect, useState } from "react";

const UserList = () => {
    const [userList, setUserList] = useState([]);

    const userColors = [...new Set(userList.map(user => user.color))];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://13.60.58.35:5000/api/userlist');
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
            await axios.delete(`http://13.60.58.35:5000/api/deleteUser/${username}`);
            setUserList(prevUserList => prevUserList.filter(user => user.username !== username));
            alert("삭제되었습니다.");
        } catch (error) {
            console.error("유저 삭제 실패:", error);    
        }
    };

    return (
        <React.Fragment>
            UserList
            {userColors.map(color => (
                <div key={color}>
                    {filteringUser(color)}
                </div>
            ))}
        </React.Fragment>
    )
}

export default UserList;