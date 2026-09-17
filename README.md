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

flowchart TD

subgraph group_backend["Backend API"]
  node_api["Express API<br/>Express entry<br/>[app.js]"]
  node_routes["Route modules<br/>HTTP routes"]
  node_auth["Auth lifecycle<br/>controller + service<br/>[auth.service.js]"]
  node_auth_guard["Auth middleware<br/>request guard<br/>[auth.middleware.js]"]
  node_links["URL lifecycle<br/>controller + service"]
  node_link_dao["Short URL DAO<br/>persistence access<br/>[short_url.js]"]
  node_user_model["User model<br/>Mongoose model<br/>[user.model.js]"]
  node_link_model["Short URL model<br/>Mongoose model<br/>[shortUrl.model.js]"]
  node_mongo_config["Mongo configuration<br/>database setup<br/>[mongo.config.js]"]
end

subgraph group_frontend["React SPA"]
  node_client["React bootstrap<br/>Vite entry<br/>[main.jsx]"]
  node_app["Application shell<br/>React root<br/>[App.jsx]"]
  node_router["App router<br/>React Router<br/>[AppRouter.jsx]"]
  node_auth_context["Auth context<br/>client identity state<br/>[AuthContext.jsx]"]
  node_protected_route["Protected route<br/>route guard<br/>[ProtectedRoute.jsx]"]
  node_pages["Public and dashboard views<br/>React pages<br/>[Dashboard.jsx]"]
  node_url_form["URL creation form<br/>React component<br/>[Url_form.jsx]"]
  node_axios["Axios client<br/>API transport<br/>[axios.js]"]
  node_query["Query client<br/>server-state cache<br/>[queryClient.js]"]
end

subgraph group_external["External Systems"]
  node_google{{"Google OAuth<br/>identity provider<br/>[google.config.js]"}}
  node_mongodb[("MongoDB<br/>system of record")]
end

node_client -->|"renders"| node_app
node_app -->|"hosts"| node_router
node_router -->|"guards private routes"| node_protected_route
node_protected_route -->|"reads session"| node_auth_context
node_router -->|"renders views"| node_pages
node_pages -->|"uses"| node_url_form
node_pages -->|"queries and mutates"| node_query
node_auth_context -->|"auth requests"| node_axios
node_query -->|"API transport"| node_axios
node_axios -->|"HTTP with cookies"| node_api
node_api -->|"mounts"| node_routes
node_routes -->|"authentication endpoints"| node_auth
node_routes -->|"protects requests"| node_auth_guard
node_auth_guard -->|"authenticated context"| node_links
node_routes -->|"link and dashboard endpoints"| node_links
node_auth -->|"reads and writes users"| node_user_model
node_auth -->|"OAuth 2.0"| node_google
node_links -->|"persists and resolves"| node_link_dao
node_link_dao -->|"uses"| node_link_model
node_mongo_config -->|"connects"| node_mongodb
node_user_model -->|"stores identities"| node_mongodb
node_link_model -->|"stores links and clicks"| node_mongodb

click node_api "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/app.js"
click node_auth "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/services/auth.service.js"
click node_auth_guard "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/middleware/auth.middleware.js"
click node_links "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/services/short_url.service.js"
click node_link_dao "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/dao/short_url.js"
click node_user_model "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/models/user.model.js"
click node_link_model "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/models/shortUrl.model.js"
click node_mongo_config "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/config/mongo.config.js"
click node_google "https://github.com/aditya-gaur1/url_shortner/blob/main/Backend/src/config/google.config.js"
click node_client "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/main.jsx"
click node_app "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/App.jsx"
click node_router "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/routing/AppRouter.jsx"
click node_auth_context "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/context/AuthContext.jsx"
click node_protected_route "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/routing/ProtectedRoute.jsx"
click node_pages "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/pages/Dashboard.jsx"
click node_url_form "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/components/Url_form.jsx"
click node_axios "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/api/axios.js"
click node_query "https://github.com/aditya-gaur1/url_shortner/blob/main/Frontend/src/lib/queryClient.js"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_api,node_routes,node_auth,node_auth_guard,node_links,node_link_dao,node_user_model,node_link_model,node_mongo_config toneBlue
class node_client,node_app,node_router,node_auth_context,node_protected_route,node_pages,node_url_form,node_axios,node_query toneAmber
class node_google,node_mongodb toneMint
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
