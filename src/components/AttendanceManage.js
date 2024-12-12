import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import "../css/AttendanceManage.css";

const AttendanceManage = () => {
    const [result, setResult] = useState("");
    const [userList, setUserList] = useState([]);
    const [bestMatch, setBestMatch] = useState("");
    const [absentList, setAbsentList] = useState([]);
    const [fileExist, setFileExist] = useState(false);
    const [dots, setDots] = useState("");   //점의 개수 상태
    const [image, setImage] = useState(null);   //원본 이미지
    const [croppedImage, setCroppedImage] = useState(null);     //자른 이미지
    const cropperRef = useRef(null);


    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ".")); // 점 3개까지 증가 후 초기화
        }, 500); // 0.5초 간격으로 업데이트

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get("https://goyang0360.o-r.kr/api/userlist");
            setUserList(response.data);
        } catch (error) {
            console.error("유저 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("이미지를 업로드해주세요.");
            return;
        }

        setFileExist(true);
        setImage(URL.createObjectURL(file)); // 이미지 미리보기 설정
    };

    // 이미지를 자른 후 croppedImage 상태 업데이트
    const getCroppedImage = () => {
        if (cropperRef.current) {
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
                // Blob을 FormData에 추가합니다.
                const formData = new FormData();
                formData.append("image", blob, "image"); // 파일명 지정
    
                setCroppedImage(URL.createObjectURL(blob)); // 자른 이미지를 미리보기로 설정
                setImage(null);
    
                // 서버로 전송하는 부분을 추가합니다.
                handleUploadCroppedImg(formData);
            });
        }
    };

    // 서버로 이미지를 전송하는 함수
    const handleUploadCroppedImg = async (formData) => {
        try {
            const response = await axios.post("https://goyang0360.o-r.kr/ocr", formData, {
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

        const absentUser = userList.filter((user) =>
            filteredResults.some((result) => result.bestMatch === user.username)
        );

        setAbsentList(absentUser);  //결석자 명단

        const updatedUserList = userList.filter(
            (user) => !filteredResults.some((res) => res.bestMatch === user.username)
        );

        setUserList(updatedUserList);   //출석자 명단
    }

    return (
        <React.Fragment>
            {!result && !croppedImage && !image && (
                <div className="upload_bt">
                    <input type="file" accept="image/*" onChange={handleUploadImg} />
                    {fileExist && !result && (
                        <p className="loading">인식중입니다. 잠시만 기다려주세요{dots}</p>
                    )}
                </div>
            )}

            {image && (
                <div className="image_cropper">
                    <Cropper
                        src={image}
                        ref={cropperRef}
                        style={{ width: "100%", height: "auto" }}
                        guides={false} // 자르기 가이드선 비활성화
                        cropBoxResizable={true}
                        cropBoxMovable={true}
                    />
                    <button className="cropper_bt" onClick={() => getCroppedImage()}>자르기</button>
                </div>
            )}

            {croppedImage && (
                <div className="cropped_preview">
                    <img src={croppedImage} alt="Cropped preview"
                        style={{ width: "100%", height: "auto" }} />
                    <button className="cropper_bt" onClick={() => handleUploadCroppedImg()}>완료</button>
                </div>
            )}
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
                    <p>출석자: </p>
                    <div className="list red">
                        <span className="reddot"></span>
                        ({userList.filter((user) => user.color === "빨강색").length})
                        {userList.filter((user) => user.color === "빨강색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list silver">
                        <span className="silverdot"></span>
                        ({userList.filter((user) => user.color === "은색").length})
                        {userList.filter((user) => user.color === "은색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list blue">
                        <span className="bluedot"></span>
                        ({userList.filter((user) => user.color === "파랑색").length})
                        {userList.filter((user) => user.color === "파랑색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list excep">
                        <span className="excepdot"></span>
                        ({userList.filter((user) => user.color === "그 외").length})
                        {userList.filter((user) => user.color === "그 외").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                </div>
            )}
            {bestMatch && (
                <div className="attendanceList">
                    <p>결석자: </p>
                    <div className="list red">
                        <span className="reddot"></span>
                        ({absentList.filter((user) => user.color === "빨강색").length})
                        {absentList.filter((user) => user.color === "빨강색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list silver">
                        <span className="silverdot"></span>
                        ({absentList.filter((user) => user.color === "은색").length})
                        {absentList.filter((user) => user.color === "은색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list blue">
                        <span className="bluedot"></span>
                        ({absentList.filter((user) => user.color === "파랑색").length})
                        {absentList.filter((user) => user.color === "파랑색").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                    <div className="list excep">
                        <span className="excepdot"></span>
                        ({absentList.filter((user) => user.color === "그 외").length})
                        {absentList.filter((user) => user.color === "그 외").map(user => (
                            <p className="username">{user.username}</p>
                        ))}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default AttendanceManage;