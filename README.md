# 토이 프로젝트: 출결 관리 서비스

## 프로젝트 소개
  * 실근무에서 작업의 효율성을 개선하고 편의를 제공하기 위해 제작된 웹 어플리케이션입니다.

<br>

## 개발 기간
  * 2024.12.2 ~ 2024.12.6 (5일간)

<br>

## 기술 스택
### FE
  * <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  * <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  * [![axios](https://img.shields.io/badge/axios-^1.4.0-blue)](https://axios-http.com)
  * <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>  (배포환경)


  <br>

### BE  (https://github.com/ChangwooJ/AttendanceList_BE)
  * <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  * <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
  * <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
  * <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>  (배포환경)


<br>

## 페이지 설명

<br>

 * 출결자 관리 페이지

   ![Atten FE](https://github.com/user-attachments/assets/e38bbc07-61d5-493e-bb7c-3898800212fb)

   사진 속 글자 인식을 통해 결석자를 관리한다.

   Google Vision Api의 OCR인식 기능을 사용해 손글씨를 최대한 인식하고, 오차를 줄이기 위해 fuse.js 라이브러리를 활용하였다.


<br>

 * 유저 목록 페이지

   ![Atten FE3](https://github.com/user-attachments/assets/4aa75af9-5125-4b8f-9e35-5870d5c85f2d)


   유저 목록을 출력한다.

   악용을 방지하기 위해 관리자 권한을 위한 보안 기능을 추가해두었다.

   유저 추가와 삭제를 위해선 관리자 권한으로 접근하여야한다.

<br>





## 패키지 구조

```
project-root/
└── client/
    ├── public/
    └── src/
        ├── components/
        |   ├── admin/                #  관리자 확인 컴포넌트
        |   ├── AttendanceManage/     #  글씨 인식 및 분류 컴포넌트
        |   └── UserManage/           #  유저 추가 컴포넌트
        ├── pages/                    
        |   ├── Attendance/           #  출결 관리 페이지
        |   ├── Home/                 #  메인(초기) 페이지
        |   └── UserList/             #  유저 리스트 페이지
        └── App.js               # React DOM 랜더링
```

<br>

## ERD

```mermaid
erDiagram
    USER {
        INT _id
        STRING username
        STRING color
    }