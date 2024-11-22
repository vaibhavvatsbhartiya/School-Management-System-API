This readme file outlines a project to build a **School Management System API** with the following main requirements:

#### Key Features:

1. **Students Module**:

   - CRUD operations for students.
   - Store student profile images on **Cloudinary**.
   - Pagination and filtering by class.

2. **Teachers Module**:

   - CRUD operations for teachers.
   - Profile image handling using **Cloudinary**.
   - Pagination support.

3. **Classes Module**:

   - CRUD operations for classes.
   - Assign teachers and manage students in classes.
   - Maintain relationships between classes, students, and teachers.

4. **Security**:
   - **JWT-based authentication** for admin access.
   - Route protection for sensitive operations.

#### Tech Stack:

- Backend: **Node.js**, **Express.js**.
- Database: **MongoDB**.
- Image Hosting: **Cloudinary**.
- Authentication: **JWT**.

#### Additional Features:

- Attendance tracking.
- Exam and results management.
- Class reports generation.

---

### API Content

```markdown
# School Management System

## Objective

A backend API for managing students, teachers, and classes with features like profile image uploads using **Cloudinary** and secure operations via **JWT-based authentication**.

---

## Features

### 1. Students

- Add a new student.
- Get all students (supports pagination and filtering by class).
- Get a single student by ID.
- Update student details (name, class, profile image, etc.).
- Delete a student (soft delete preferred).

### 2. Teachers

- Add a new teacher.
- Get all teachers (pagination supported).
- Get a teacher by ID.
- Update teacher details (name, subject, profile image).
- Delete a teacher (soft delete preferred).

### 3. Classes

- Create and manage classes.
- Assign teachers to classes.
- Update class details.
- Manage student count for each class.

---

## Additional Features

- JWT-based admin authentication.
- Attendance tracking for students.
- Exam and results management.
- Class reports generation.

---

## Tech Stack

- **Node.js** - Backend runtime.
- **Express.js** - Web framework.
- **MongoDB** - Database for storing data.
- **Cloudinary** - Image hosting.
- **JWT** - Authentication.
```

---

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account for image uploads.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vaibhavvatsbhartiya/School-Management-System-API.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```
   PORT=3000
   MONGO_URI= your mongo URI
   JWT_SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=your_chosen_time_for_token_to_expires
   ```
4. Start the server:
   ```bash
   npm run start or npm run dev
   ```

---

## API Endpoints

### Students

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/students`     | Add a new student      |
| GET    | `/api/students`     | Get all students       |
| GET    | `/api/students/:id` | Get a student by ID    |
| PUT    | `/api/students/:id` | Update student details |
| DELETE | `/api/students/:id` | Soft delete a student  |

### Teachers

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/teachers`     | Add a new teacher      |
| POST   | `/api/auth`         | Use JWT and get token  |
| GET    | `/api/teachers`     | Get all teachers       |
| GET    | `/api/teachers/:id` | Get a teacher by ID    |
| PUT    | `/api/teachers/:id` | Update teacher details |
| DELETE | `/api/teachers/:id` | Soft delete a teacher  |

### Classes

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/classes`     | Create a new class   |
| GET    | `/api/classes`     | Get all classes      |
| GET    | `/api/classes/:id` | Get a class by ID    |
| PUT    | `/api/classes/:id` | Update class details |
| DELETE | `/api/classes/:id` | Delete a class       |

---

This repo will updated soon and also this API's public url will be share soon after completion of this project.

### Current Status of API

1. Create Models ✅.
2. Connected to MongoDB Atlas ✅.
3. Create route for Students ✅.
4. Create route for Teachers ✅.
5. Create route for Classes ✅.
6. Connected to Cloudinary DB ✅.
7. Handle common errors like duplicate entries(email) while creating a new entry(Student, Teacher) ✅.
8. Create controllers for Students, Teachers & Classes ✅.
9. Add JWT Auth ✅.
10. Protect routes to ensure only authorized users can perform operations ✅.
11. Add a pagination in the get route of student and teacher ✅. 
   - (Teacher example: `Live_URL/api/teachers?page=1&limit=6`) 
   - (Student example: `Live_URL/api/students?page=1&limit=2`)
   ***set limit and page according to your need.***
12. Allow uploading and updating profile images for students and teachers using Cloudinary 📈.
