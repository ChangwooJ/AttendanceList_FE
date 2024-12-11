# 토이 프로젝트: 출결 관리 서비스

## 프로젝트 소개
  * 실근무에서 작업의 효율성을 개선하고 편의를 제공하기 위해 제작된 웹 어플리케이션입니다.

## 개발 기간
  * 2024.12.2 ~ 2024.12.6 (5일간)

## 기술 스택
### FE
  * <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  * <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  * [![axios](https://img.shields.io/badge/axios-^1.4.0-blue)](https://axios-http.com)
  * <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>  (배포환경)
  

### BE  (https://github.com/ChangwooJ/AttendanceList_BE)
  * <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  * <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
  * <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
  * <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>  (배포환경)


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



## ERD

```mermaid
erDiagram
    USER {
        INT _id
        STRING username
        STRING color
    }