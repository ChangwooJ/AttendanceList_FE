import React, { useState } from "react";
import UserManage from "../components/UserManage";
import AttendanceManage from "../components/AttendanceManage";

const Attendance = () => {
    const [newUser, setNewUser] = useState(false);
    const [attendance, setAttendance] = useState(false);

    return (
        <React.Fragment>
            <button onClick={() => {setNewUser(true);}}>입소자</button>
            {newUser && (<UserManage option={"insert"} />)}
            <button onClick={() => {setAttendance(true);}}>사진 등록</button>
            {attendance && (<AttendanceManage />)}
        </React.Fragment>
    )
}

export default Attendance;