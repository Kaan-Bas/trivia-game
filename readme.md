# Trivia Game — Spring Boot + React + MySQL

A full-stack trivia application where users can register, log in, answer questions, and track their stats.

#### *Project is still in development, the core of the application is finished but the following features will be added to complete the project:
- Design improvement (current design is only minimal)
- Option to choose different categories and difficulties for questions
- Security & Authentication in back-end
- Possibly add achievements and/or level up system

---

## Features
- Trivia questions from **OpenTDB API**
- User login & registration
- Per-user stats tracking

---

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- SCSS

### Backend
- Spring Boot
- Hibernate / JPA
- Maven

### Database
- MySQL

---

# Installation

## 1) Clone the Repository

```bash
git clone https://github.com/Kaan-Bas/trivia-game.git
cd YOUR_REPO
```

## 2) Set up MySQL

Create the database:

```sql
CREATE DATABASE trivia_game;
```

Make sure MySQL is running on: 

```makefile
localhost:3306
```

## 3) Backend environment variables

Mac/Linux (one by one):

```bash
export DB_URL="jdbc:mysql://localhost:3306/trivia_game?useSSL=false&serverTimezone=UTC"
export DB_USER="your_mysql_username"
export DB_PASS="your_mysql_password"
```

Windows (one by one):

```bash
$env:DB_URL = "jdbc:mysql://localhost:3306/trivia_game?useSSL=false&serverTimezone=UTC"
$env:DB_USER = "your_mysql_username"
$env:DB_PASS = "your_mysql_password"
```

## 4) Run the backend

```bash
./mvnw spring-boot:run
```

## 5) Set up the frontend

Navigate into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install 
```

Run the dev server:

```bash
npm run dev
```

Frontend will be available at:
```makefile
http://localhost:5173
```

## 6) Usage

1. Register a new user
2. Log in
3. Start answering trivia questions
4. Your stats update automatically based on correct/incorrect answers
5. View your stats on the **Stats** page
6. Continue playing — new questions load every 10 answered  
