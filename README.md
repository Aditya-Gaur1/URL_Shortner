# 🔗 URL Shortener

A full-stack URL Shortener built using the **MERN Stack**. This application allows users to convert long URLs into short, shareable links, generate QR codes for easy access, and track the number of clicks on each shortened URL.

---

## 🚀 Features

- 🔗 Shorten long URLs instantly
- ✅ URL validation
- 📱 Generate QR Codes for shortened links
- ⬇️ Download QR Code as PNG
- 📋 One-click copy to clipboard
- 📊 Click tracking for each shortened URL
- 🎨 Modern Glassmorphism UI with Tailwind CSS
- ⚡ Fast and responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- react-qr-code
- qrcode

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- NanoID
- CORS
- Dotenv

---

## 📂 Project Structure

```
URL_SHORTENER/
│
├── Backend/
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── url.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
```

```bash
cd url-shortener
```

---

### 2. Install dependencies

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../Frontend
npm install
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd Backend
npm run dev
```

### Start Frontend

```bash
cd Frontend
npm run dev
```

The application will be available at:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```
screenshots/
│
├── Home.png
├── Result.png
└── QR-Code.png
```

---

## 📖 API Endpoints

### Create Short URL

```
POST /shorten
```

#### Request Body

```json
{
  "originalUrl": "https://example.com"
}
```

#### Response

```json
{
  "shortId": "AbCd123",
  "shortUrl": "http://localhost:5000/AbCd123"
}
```

---

### Redirect to Original URL

```
GET /:shortId
```

Redirects the user to the original URL and increments the click count.

---



---

## 👨‍💻 Author

Aditya Gaur


---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
