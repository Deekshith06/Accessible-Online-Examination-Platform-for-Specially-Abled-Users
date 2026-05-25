# AccessExam Backend — Spring Boot REST API

## 🚀 Quick Start

### Prerequisites
- **Java 17 or 21** must be installed.
  - Download: https://adoptium.net/temurin/releases/?version=17
  - After install: `java -version` should show `17.x.x`
- **Maven is NOT required** — the `mvnw.cmd` wrapper auto-downloads it.

---

## ▶️ Running the Backend

Open a terminal in the `backend/` folder and run:

```cmd
.\mvnw.cmd spring-boot:run
```

On first run, Maven is automatically downloaded (~10MB, one-time).

The server will start at: **http://localhost:8080**

---

## 🔑 Pre-seeded Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@accessexam.com | admin123 |
| Student | yugandhar@example.com | student123 |
| Student | arun@example.com | student123 |
| Student | priya@example.com | student123 |

---

## 📡 API Endpoints

### Auth (Public)
```
POST /api/auth/register    Register a new user
POST /api/auth/login       Login → returns JWT token
```

### Exams (Authenticated)
```
GET  /api/exams            List all exams
GET  /api/exams/{id}       Get exam with questions (no correct answers)
POST /api/exams            Create exam (Admin only)
PUT  /api/exams/{id}       Update exam (Admin only)
DELETE /api/exams/{id}     Delete exam (Admin only)
```

### Questions (Authenticated)
```
GET    /api/questions/exam/{examId}   Get questions for an exam
POST   /api/questions                 Add question (Admin only)
PUT    /api/questions/{id}            Update question (Admin only)
DELETE /api/questions/{id}            Delete question (Admin only)
```

### Submissions (Authenticated)
```
POST /api/submissions/start/{examId}  Start exam attempt
POST /api/submissions/submit          Submit answers → full graded result
GET  /api/submissions/my              My submission history
GET  /api/submissions/exam/{examId}   All exam submissions (Admin only)
```

### Users (Authenticated)
```
GET /api/users/me                     Get my profile
PUT /api/users/me/accessibility       Save accessibility preferences
GET /api/users                        List all students (Admin only)
PUT /api/users/{id}/extra-time        Grant extra time (Admin only)
```

---

## 📋 Example: Login

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "yugandhar@example.com",
  "password": "student123"
}
```

Response:
```json
{
  "token": "eyJhbGci...",
  "userId": 2,
  "name": "Yugandhar",
  "role": "STUDENT",
  "disabilityType": "VISUAL",
  "extraTimeMinutes": 30
}
```

---

## 🗄️ H2 Database Console

While running, browse to: **http://localhost:8080/h2-console**

```
JDBC URL:  jdbc:h2:mem:accessexamdb
Username:  sa
Password:  (leave empty)
```

---

## 🔀 Switch to MySQL (Production)

1. Uncomment the MySQL lines in `src/main/resources/application.properties`
2. Comment out the H2 lines
3. Create database: `CREATE DATABASE accessexam_db;`
4. Update credentials in `application.properties`
5. Restart the backend

---

## 📦 Project Structure

```
backend/
├── src/main/java/com/accessexam/
│   ├── config/          # SecurityConfig, CorsConfig, GlobalExceptionHandler
│   ├── controller/      # AuthController, ExamController, QuestionController,
│   │                    # SubmissionController, UserController
│   ├── dto/             # Request/Response data transfer objects
│   ├── entity/          # JPA entities (User, Exam, Question, ExamAttempt, Answer)
│   ├── repository/      # Spring Data JPA repositories
│   ├── security/        # JwtUtil, JwtFilter, UserDetailsServiceImpl
│   └── service/         # AuthService, ExamService, QuestionService,
│                        # SubmissionService, UserService
├── src/main/resources/
│   ├── application.properties   # Config (H2 dev / MySQL prod)
│   └── data.sql                 # Seed data (users, exams, questions)
└── pom.xml
```

---

## 🔒 Security Model

- **JWT** authentication (stateless, no sessions)
- Send `Authorization: Bearer <token>` header on all protected requests
- **STUDENT** role: take exams, view own results, manage own profile
- **ADMIN** role: create/manage exams, view all results, grant accommodations
- Correct answers are **never sent to the frontend** (server-side grading only)
