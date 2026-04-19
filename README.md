# 🐶 Dog Management API (Node.js + MongoDB)

A scalable backend system for managing dog breeds with authentication, authorization, and soft delete functionality.

Built using clean architecture:
**Controller → Service → Repository**

---

## 🌍 Live API

🔗 Base URL: https://backend-dogs-repo.onrender.com/

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Forgot Password functionality
* JWT-based authentication
* Role-based access control

### 🐶 Dog Management (CRUD)

* Create dog
* Fetch dogs (with filters & pagination)
* Update dog
* Soft delete dog

### 🧾 Advanced Features

* Soft delete support
* Audit fields (`createdBy`, `updatedBy`)
* Pagination & filtering
* Sorting support

### 🛡️ Security

* JWT authentication
* Password hashing using bcrypt
* CORS enabled
* Helmet security headers
* 🚦 **Rate limiting (express-rate-limit)** to prevent abuse

---

## 🧱 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── repo/
 ├── routes/
 ├── models/
 ├── middlewares/
 ├── utils/
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt
* Express Rate Limiter
* Render (Deployment)
* MongoDB Atlas

---

## 🔑 Environment Variables

Create a `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/dogsdb
PORT=5000
JWT_SECRET=dogs_api_secret_key
```

### Production

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dogsdb
```

---

## 📦 Installation

```bash
git clone https://github.com/Abhitarra/backend_dogs_repo.git
cd backend_dogs_repo
npm install
npm run start:dev
```

---

## 🔐 Authentication APIs

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| POST   | /auth/signup          | Register user  |
| POST   | /auth/login           | Login user     |
| POST   | /auth/forgot-password | Reset password |
| POST   | /auth/reset-password  | Reset password |

---

## 🐶 Dog APIs

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | /dogs/fetch      | Get dogs        |
| POST   | /dogs/create     | Create dog      |
| PUT    | /dogs/update/:id | Update dog      |
| DELETE | /dogs/delete/:id | Soft delete dog |

---

## 🔐 Authorization

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧪 Sample Request

### Forgot Password

```
POST /auth/reset-password
```

Body:

```
{
  "email": "user@example.com",
  "newPassword": "NewPassword123"
}
```

---

## 🚦 Rate Limiting

To prevent abuse, API requests are limited:

* Limits repeated requests from same IP
* Protects authentication endpoints
* Helps prevent brute-force attacks

---

## 🗑️ Soft Delete Logic

```
isDeleted = true
deletedBy = userId
deletedAt = timestamp
```

---

## 🚀 Deployment

### Backend (Render)

* Hosted on Render
* MongoDB Atlas integration
* Environment variables configured

---

## 📚 Learnings

* Clean architecture design
* JWT authentication & authorization
* Rate limiting & API security
* MongoDB schema design
* REST API best practices

---

## 📌 Future Improvements

* OTP-based email reset
* Activity logs
* Restore deleted records
* Advanced security layers

---

## 👨‍💻 Author

**Abhishek Tarra**

---

## ⭐ Notes

This project demonstrates:

* Scalable backend architecture
* Secure API design
* Production-ready patterns

---

✨ *Happy Coding!* 🚀
