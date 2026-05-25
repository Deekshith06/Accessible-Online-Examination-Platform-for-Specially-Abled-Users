# Accessible Online Examination Platform for Specially-Abled Users ♿

A comprehensive, inclusive, and accessible online examination platform designed specifically for specially-abled students. It features specialized interfaces tailored for different disability types, including Visual Impairment, Motor Impairment, Hearing Impairment, and Cognitive Impairment.

## 🚀 Features

*   **Disability-Specific Interfaces:** Adaptive UI based on the student's selected disability type.
*   **Visual Impairment Mode:** Voice-guided navigation, screen reader compatibility, and high-contrast visuals.
*   **Motor Impairment Mode:** Keyboard-only navigation and larger clickable areas.
*   **Hearing Impairment Mode:** Visual cues and transcripts.
*   **Cognitive Impairment Mode:** Simplified layout, clear instructions, and reduced distractions.
*   **Admin Dashboard:** Create and manage exams, questions, and students.
*   **Student Dashboard:** View upcoming exams, attempt exams, and see results.
*   **Secure API:** Spring Boot backend with JWT authentication.

## 🛠️ Technology Stack

*   **Frontend:** HTML5, Vanilla CSS, JavaScript (p5.js, Vanta.js for animations).
*   **Backend:** Java 17, Spring Boot, Spring Security (JWT).
*   **Database:** H2 (Development) / MySQL (Production).

## 📂 Repository Structure

*   `/` (Root): Frontend source code (HTML, CSS, JS).
*   `/backend`: Spring Boot REST API.

---

## ▶️ Getting Started

### 1. Running the Backend

The backend is built with Spring Boot and uses an in-memory H2 database by default.

**Prerequisites:** Java 17 or higher.

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Start the Spring Boot application using the Maven wrapper:
    ```bash
    ./mvnw spring-boot:run
    ```
    *(On Windows, use `.\mvnw.cmd spring-boot:run`)*

The server will start at **http://localhost:8080**.
For detailed API documentation and configuration, please refer to the [Backend README](backend/README.md).

### 2. Running the Frontend

The frontend consists of static files and can be served using any basic HTTP server.

1.  From the root directory, start a Python HTTP server (or any alternative like `npx serve`):
    ```bash
    python3 -m http.server 8000
    ```
2.  Open your browser and navigate to **http://localhost:8000**.

---

## 🔑 Pre-seeded Test Accounts

Use these accounts to test the platform without registering:

| Role    | Email                 | Password   |
| :------ | :-------------------- | :--------- |
| Admin   | admin@accessexam.com  | admin123   |
| Student | yugandhar@example.com | student123 |
| Student | arun@example.com      | student123 |
| Student | priya@example.com     | student123 |