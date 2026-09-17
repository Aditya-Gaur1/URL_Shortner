# 🔗 URL Shortener

A full-stack URL shortening platform built with the MERN stack.

The application allows users to create short URLs, use custom slugs, track link clicks, manage their URLs through a dashboard, authenticate using email/password or Google OAuth, and generate QR codes for shortened links.

Live Link :- https://url-shortener-frontend-0zdj.onrender.com
---

## 🚀 Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Access and refresh tokens
- HTTP-only cookies
- Google OAuth 2.0 authentication
- Protected routes
- User-specific URL management

### 🔗 URL Shortening

- Generate random short URLs
- Create custom slugs
- Redirect short URLs to original URLs
- Track URL clicks
- Prevent unauthorized URL management

### 📊 Dashboard

- View all created URLs
- Total URL statistics
- Total click statistics
- Custom URL statistics
- Delete URLs
- Copy shortened URLs
- Generate and display QR codes

### 🎨 Frontend

- Responsive React interface
- Dark-themed UI
- Authentication-aware navigation
- Loading and error states
- TanStack Query for server-state management
- Clipboard-based URL sharing

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- TanStack Query
- Axios
- qrcode.react

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Passport.js
- Google OAuth 2.0
- bcrypt
- cookie-parser
- CORS

---

## 🏗️ Project Structure
```text
URL_Shortner/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dao/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── routing/
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
