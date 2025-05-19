# 🛍️ Lots of Shopping

A full-featured mobile **E-commerce App** built with **React Native** for the frontend and **Node.js/Express/MySQL** for the backend.

## 📆 Project Overview

* Mobile-first shopping experience built using React Native.
* Users can sign up, log in, browse products, add to cart, submit orders, and post reviews.
* Admins can manage users, delete reviews, and maintain product listings.
* JWT authentication with `AsyncStorage` for secure sessions.
* Backend with Express API and MySQL for data persistence.
* File uploads via Multer for product images.

---

## ⚙️ Setup Instructions

### 📱 Frontend (React Native)

1. Clone the repository:

   ```bash
   https://github.com/HamzaSiraj657/MAD-Final-P2.git
   cd work-main
   ```

2. Install dependencies:

   ```bash
   npm install
   npm install @react-native-async-storage/async-storage
   ```

3. Start Android app:

   ```bash
   npx react-native run-android
   ```

---

### 🌐 Backend (Node.js + Express)

1. Navigate to the backend folder:

   ```bash
   cd work-main/backend
   ```

2. Initialize and install dependencies:

   ```bash
   npm init -y
   npm install express mysql2 cors body-parser bcrypt jsonwebtoken dotenv multer
   ```

3. Start the backend server:

   ```bash
   node server.js
   # Or with live-reload:
   npx nodemon server.js
   ```

---

## 🥺 Sample User Credentials

| Role  | Email                                           | Password |
| ----- | ----------------------------------------------- | -------- |
| user  | [testuser@gmail.com]                            | user123  |
| admin | [admin@gmail.com]                               | admin123 |

> ⚠️ Only emails ending in `@gmail.com` are accepted during sign up.

---

## 🗓️ Migration Instructions

Ensure you have **Knex CLI** installed globally:

```bash
npm install -g knex
```

Then run the migration:

```bash
cd work-main/backend
npx knex migrate:latest
```

This will create necessary tables including:

* `users`
* `products`
* `orders`
* `reviews`

---

## 🦢 Postman Collection API Endpoints

You can test these endpoints using [Postman](https://www.postman.com/):

| Feature  | Method   | Endpoint                               |
| -------- | -------- | -------------------------------------- |
| Products | GET      | `http://localhost:3000/api/products/`  |
| Reviews  | GET      | `http://localhost:3000/api/reviews/`   |
| Users    | GET      | `http://localhost:3000/api/auth/users` |
| Orders   | GET      | `http://localhost:3000/api/orders`     |

### 🛠️ How to Import in Postman:

1. Open Postman.
2. Click **"Import"** in the top left.
3. Select **"Raw Text"** and paste the endpoint list above or upload a saved collection file.
4. Start making API calls!

---

##

---

---

## 🔐 Security Note

* JWT is used for secure API authentication.
* Passwords are hashed with **bcrypt**.
* Admin-specific logic is handled server-side.

---

##
