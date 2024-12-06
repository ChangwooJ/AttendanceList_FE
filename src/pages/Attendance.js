import React, { useState } from "react";
import AttendanceManage from "../components/AttendanceManage";

import "../css/Attendance.css";

const Attendance = () => {
    const [attendance, setAttendance] = useState(false);

    return (
        <div className="attendance_wrap">
            {!attendance && (<button className="attendance_bt" onClick={() => {setAttendance(true);}}>사진 등록</button>)}
            {attendance && (<AttendanceManage />)}
        </div>
    )
}

export default Attendance;