import axios from "axios";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

import "../css/AttendanceManage.css";

const AttendanceManage = () => {
    const [result, setResult] = useState("");
    const [userList, setUserList] = useState([]);
    const [bestMatch, setBestMatch] = useState("");

    const fetchUserList = async () => {
        try {
            const response = await axios.get("http://13.60.58.35:5000/api/userlist");
            setUserList(response.data); 
        } catch (error) {
            console.error("유저 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const handleUploadImg = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("이미지를 업로드해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("http://13.60.58.35:5000/ocr", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const scanlist = response.data.text.replace(/[.,]/g, "").split(/\s+/).filter(Boolean);

            setResult(scanlist || "텍스트를 찾을 수 없습니다.");
            findSimilarUser(scanlist);
        } catch (error) {
            console.error("OCR 요청 실패:", error);
            alert("OCR 처리 중 오류가 발생했습니다.");
        }
    };

    const findSimilarUser = (ocrText) => {        
        const options = {
            includeScore: true,
            threshold: 0.6,
            keys: ["username"],
        };

        const fuse = new Fuse(userList, options);
        const results = ocrText.map((text) => {
            const matches = fuse.search(text);
            if (matches.length > 0) {
                return {
                    input: text,
                    bestMatch: matches[0].item.username,
                    score: matches[0].score,
                };
            } else {
                return {
                    input: text,
                    bestMatch: text,
                    score: null,
                };
            }
        });
    
        setBestMatch(results);
        attendanceProcess(results);
    };

    const attendanceProcess = (results) => {
        const filteredResults = results.filter((result) => result.score !== null);
        const updatedUserList = userList.filter(
            (user) => !filteredResults.some((res) => res.bestMatch === user.username)
        );
    
        setUserList(updatedUserList);
        console.log(userList);
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleUploadImg} />
            {result && <div className="scanList">{result.map((res, index) => (
                <p key={index} className="scanUser">
                    {res}
                </p>
            ))}</div>}
            {bestMatch && <div className="matchingList">→ {bestMatch.map((bm, index) => (
                <>
                    {!bm.score && 
                        <p key={index} className="matchingUser">
                            {bm.bestMatch}
                        </p>}
                    {bm.score &&
                        <p key={index} className="matchingUser">
                            {bm.bestMatch}
                        </p>}
                </>
            ))}</div>}
            {bestMatch && <div className="exception">누락자: {bestMatch.map((bm, index) => (
                <>
                    {!bm.score &&
                        <p key={index} className="exceptionUser">
                            {bm.bestMatch}
                        </p>}
                </>
            ))}</div>}
            {bestMatch && (
                <div className="attendanceList">
                    <div className="list red">
                        <p className="reddot">●</p>
                        ({userList.filter((user) => user.color === "빨강색").length})
                        {userList.filter((user) => user.color === "빨강색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list silver">
                        <p className="silverdot">●</p>
                        ({userList.filter((user) => user.color === "은색").length})
                        {userList.filter((user) => user.color === "은색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list blue">
                        <p className="bluedot">●</p>
                        ({userList.filter((user) => user.color === "파랑색").length})
                        {userList.filter((user) => user.color === "파랑색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list excep">
                        <p className="excepdot">●</p>
                        ({userList.filter((user) => user.color === "그 외").length})
                        {userList.filter((user) => user.color === "그 외").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceManage;