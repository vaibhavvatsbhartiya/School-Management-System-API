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
   ```
4. Start the server:
   ```bash
   npm run start or npm run dev
   ```

---

## API Endpoints

### Students
| Method | Endpoint               | Description                      |
|--------|-------------------------|----------------------------------|
| POST   | `/students`            | Add a new student               |
| GET    | `/students`            | Get all students                |
| GET    | `/students/:id`        | Get a student by ID             |
| PUT    | `/students/:id`        | Update student details          |
| DELETE | `/students/:id`        | Soft delete a student           |

### Teachers
| Method | Endpoint               | Description                      |
|--------|-------------------------|----------------------------------|
| POST   | `/teachers`            | Add a new teacher               |
| GET    | `/teachers`            | Get all teachers                |
| GET    | `/teachers/:id`        | Get a teacher by ID             |
| PUT    | `/teachers/:id`        | Update teacher details          |
| DELETE | `/teachers/:id`        | Soft delete a teacher           |

### Classes
| Method | Endpoint               | Description                      |
|--------|-------------------------|----------------------------------|
| POST   | `/classes`             | Create a new class              |
| GET    | `/classes`             | Get all classes                 |
| GET    | `/classes/:id`         | Get a class by ID               |
| PUT    | `/classes/:id`         | Update class details            |
| DELETE | `/classes/:id`         | Delete a class                  |

---

This repo will updated soon and also this API's public url will be share soon after completion of this project.

### Current Status of API
1. Create Models ✅.
2. Connected to MongoDB Atlas ✅.
3. Create route for Students.
4. Create route for Teachers.
5. Create route for Classes.
6. Create controllers for Students, Teachers & Classes.
7. Add JWT Auth.
8. Protect routes to ensure only authorized users can perform operations.
9. Allow uploading and updating profile images for students and teachers using Cloudinary.
10. Attendance tracking.
11. Exam and results management.
12. Class reports generation.