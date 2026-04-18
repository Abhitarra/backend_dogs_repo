# 🐶 Dog Management API (Node.js + MongoDB)

A full-stack-ready backend system to manage dogs with **authentication and soft delete functionality**.
Designed with clean architecture (**Controller → Service → Repository**) and built for scalability.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* User Signup & Login
* JWT-based authentication
* Role-based access:

  * 👤 User → Manage own dogs

---

## 🐶 Dog Management (CRUD)

* Create dog
* Fetch dogs (with filters & pagination)
* Update dog
* Soft delete dog (no permanent deletion)

---

## 🧾 Advanced Features

* Soft delete (`isDeleted`, `deletedBy`, `deletedAt`)
* Audit fields:

  * `createdBy`
  * `updatedBy`
* Pagination & filtering
* Sorting support

---

# 🧱 Project Structure

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

# ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt (password hashing)

---

# 🔑 Environment Variables

Create a `.env` file in root:

```
MONGO_URI = mongodb://127.0.0.1:27017/dogsdb
PORT = 5000
JWT_SECRET = dogs_api_secret_key
```

---

# 📦 Installation

```bash
git clone <your-repo-url>
cd Backend_Dogs_Api
npm install
npm run start:dev
```

---

# 🔐 Authentication APIs

## Signup

```
POST /auth/signup
```

## Login

```
POST /auth/login
```

Response:

```
{
  "token": "JWT_TOKEN",
  "role": "user | admin"
}
```

---

# 🐶 Dog APIs

## Create Dog

```
POST /dogs/create
```

## Fetch Dogs

```
GET /dogs/fetch?page=1&limit=10&breed=lab
```

## Update Dog

```
PUT /dogs/update/:id
```

## Delete Dog (Soft Delete)

```
DELETE /dogs/delete/:id
```

---

# 🔐 Authorization

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🧠 Business Logic

* Users can only:

  * View the dogs
  * Update/Delete the dogs

---

# 🗑️ Soft Delete Logic

Instead of deleting records:

```
isDeleted = true
deletedBy = userId
deletedAt = timestamp
```

---

# 🧪 Testing

Use tools like:

* Postman
* Thunder Client

---

# 📌 Future Improvements

* OTP-based email verification
* Activity log tracking
* Restore deleted records
* Rate limiting & security enhancements
* Frontend integration (React)

---

# 👨‍💻 Author

Abhishek Tarra
Node.js Backend Developer

---

# ⭐ Notes

This project demonstrates:

* Clean architecture
* Secure API design
* Real-world backend patterns
* Scalable structure for production apps
