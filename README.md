# NestJS Database Project

NestJS와 PostgreSQL을 사용한 사용자 인증 및 관리 시스템입니다.

## 기능

- 사용자 등록/로그인 (JWT 인증)
- 사용자 정보 조회/수정/삭제
- JWT 토큰 기반 인증
- PostgreSQL 데이터베이스 연동

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp env.example .env
```
그리고 `.env` 파일에서 데이터베이스 연결 정보를 수정하세요.

### 3. PostgreSQL 데이터베이스 설정
- PostgreSQL이 설치되어 있어야 합니다
- `nestjs_db` 데이터베이스를 생성하세요:
```sql
CREATE DATABASE nestjs_db;
```

### 4. 애플리케이션 실행
```bash
npm start
```

## API 엔드포인트

### 인증 (Auth)
- `POST /auth/signup` - 사용자 등록
- `POST /auth/login` - 로그인
- `GET /auth/me` - 현재 사용자 정보 (JWT 토큰 필요)

### 사용자 관리 (Users)
- `GET /users` - 모든 사용자 조회 (JWT 토큰 필요)
- `GET /users/search?email=email` - 이메일로 사용자 검색 (JWT 토큰 필요)
- `GET /users/:userId` - 특정 사용자 조회 (JWT 토큰 필요)
- `GET /users/:userId/exists` - 사용자 존재 여부 확인 (JWT 토큰 필요)
- `GET /users/count` - 사용자 수 조회 (JWT 토큰 필요)
- `PATCH /users/:userId` - 사용자 정보 수정 (JWT 토큰 필요)
- `DELETE /users/:userId` - 사용자 삭제 (JWT 토큰 필요)

## 사용 예시

### 1. 사용자 등록
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. 로그인
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testuser",
    "password": "password123"
  }'
```

### 3. 보호된 엔드포인트 접근
```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 프로젝트 구조

```
src/
├── common/
│   ├── db/
│   │   ├── db.config.ts          # 데이터베이스 설정
│   │   └── entities/
│   │       └── user.entity.ts    # 사용자 엔티티
│   ├── exceptions/
│   │   └── exception.config.ts   # 예외 처리 설정
│   └── interceptors/
│       └── success.interceptor.ts
├── modules/
│   ├── auth/                     # 인증 모듈
│   │   ├── auth.module.ts
│   │   ├── controller/
│   │   ├── service/
│   │   └── jwt/
│   └── user/                     # 사용자 모듈
│       ├── user.module.ts
│       ├── controller/
│       ├── service/
│       ├── repository/
│       └── dto/
└── main.ts                       # 애플리케이션 진입점
```
