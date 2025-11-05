# 🧠 Backend Intern Assignment — Sumit Maharjan

This project is a RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing tasks.  
It supports **user authentication (JWT)**, **CRUD operations**, and is fully documented and testable using **Swagger UI**.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/summitmaharjan/Backend-Intern-Assignment---Sumit-Maharjan.git
cd Backend-Intern-Assignment---Sumit-Maharjan

```
### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_token
```
### 4️⃣ Run the Server

```bash
npm run dev
```
Backend server should now be running at:
```bash
 http://localhost:8000
```
API Documentation (Swagger)

#### Swagger UI is integrated into this project to make testing APIs simple.

Once the server is running, open your browser and visit:
```bash
http://localhost:8000/api-docs
```
There you can:

🥇 View all available routes (Auth + Task APIs)

🥈 See request and response examples

🥉 Directly test the API endpoints in your browser

### 🔐 Authentication

This API uses JWT (JSON Web Tokens) for secure authentication.
Include your token in the request headers when accessing protected routes.

Example:
Authorization: Bearer <access_token>

### 🧩 Tech Stack

Node.js — Runtime environment

Express.js — Web framework

MongoDB (Mongoose) — Database

JWT — Authentication

Swagger — API documentation and testing


####### 
#### API Documentation:

#### API Url (apiUrl): http://localhost:8000/api-docs
### User Registration
    Url: {{apiUrl}}/register
    Method: POST
    Request Body:
                {
                "name": "Sumit Maharjan",
                "email": "sumit@gmail.com",
                "password": "sumit123"
                }

### User Login
    Url: {{apiUrl}}/login
    Method: POST
    Request Body:
                {
                 "email": "sumit@gmail.com",
                 "password": "sumit123"
                }

### User Logout
    Url: {{apiUrl}}/logout
    Method: POST
    Headers: 
        Authorization: Bearer <token>

-------- Detail Api Testing in Swagger Api testing File ----

### Swagger API Documentation file(doc):
Downloadable Swagger doc file: [User Task Manager API Documentation.doc](./User Task Manager API Documentation.doc)




