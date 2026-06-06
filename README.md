# Store Rating Application

A full-stack Store Rating Application built using ReactJS, Node.js, Express.js, MySQL, and JWT Authentication.

## Features

### System Administrator
- Login with JWT Authentication
- Add Users
- Add Stores
- View All Users
- View All Stores
- Search Users
- Search Stores
- Sort Users by Name
- View User Details
- Dashboard Statistics
  - Total Users
  - Total Stores
  - Total Ratings

### Normal User
- Register and Login
- Search Stores
- Submit Ratings
- Update Ratings
- Change Password

### Store Owner
- Login
- View Assigned Store
- View Average Rating
- View Users Who Rated Store
- Change Password

---

## Technologies Used

### Frontend
- ReactJS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JWT (JSON Web Token)

---

## Project Structure

backend/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
├── server.js

frontend/
├── src/
│ ├── pages/
│ ├── services/
│ ├── routes/
│ ├── App.jsx
│ └── main.jsx

---

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_app

JWT_SECRET=mysecretkey
```

Run Backend

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Database Setup

Create MySQL Database

```sql
CREATE DATABASE store_rating_app;
```

Import the provided SQL file.

---

## Test Credentials

### Admin

```text
Email: admin@test.com
Password: admin123
```

### Store Owner

```text
Email: owner@test.com
Password: owner123
```

### User

```text
Email: sam@example.com
Password: user123
```

---

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Users

```text
GET /api/users
POST /api/users
PUT /api/users/password
```

### Stores

```text
GET /api/stores
POST /api/stores
```

### Ratings

```text
GET /api/ratings
POST /api/ratings
PUT /api/ratings
```

---

## Author

Saurav Kumar

PG-DAC Student