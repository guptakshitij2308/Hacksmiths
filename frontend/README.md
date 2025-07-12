
# 🔁 Skill Swap Platform

**Skill Swap** is a React-based web application that enables users to list the skills they offer and request skills in return. It supports secure user authentication, intuitive swap management, profile customization, and an **admin dashboard** for moderation and analytics.

---

## ✨ Core Features

### ✅ User Functionality

#### 🔐 Authentication with JWT
- Secure **Login**, **Signup**, and **Logout** using **JSON Web Tokens**
- User context is managed globally using **React Context API**

#### 👤 User Profile
- Basic Info: Name, location *(optional)*, profile photo *(optional)*
- Lists of **Skills Offered** and **Skills Wanted**
- Availability preferences (e.g., *weekends*, *evenings*)
- Profile visibility: **Public** or **Private**

#### 🔍 Skill Discovery
- Browse or search users by skill (e.g., “Photoshop”, “Excel”)
- View user profiles and community feedback

#### 🔄 Swap Requests
- Send, Accept, Reject, or Delete swap requests
- View all requests by **status** (Pending, Accepted, Rejected)

#### 🌟 Ratings & Feedback
- Provide star ratings and feedback after completed swaps

---

### 🛡 Admin Dashboard Features

#### ✏️ Skill Moderation
- Approve or reject inappropriate skill descriptions

#### 👥 User Management
- Ban or unban users
- View and monitor active vs banned users

#### 🔄 Swap Monitoring
- Track all swap requests: Pending, Accepted, Cancelled

#### 📢 Broadcast Alerts
- Send platform-wide announcements (e.g., feature updates, downtimes)

#### 📊 Reports
Download platform reports in `.json` format for:
- 📈 User activity
- 📚 Skill logs
- 🔄 Swap statistics

---

## 🛠 Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | React.js, Tailwind CSS              |
| Routing     | React Router DOM                    |
| State Mgmt  | React Context API (Auth, Theme)     |
| HTTP Calls  | Axios                               |
| Auth        | JSON Web Tokens (JWT)               |

---

## 📂 Project Structure

```
src/
├── components/         # Reusable UI (Navbar, Footer, Modals)
├── context/            # AuthContext.js, ThemeContext.js
├── pages/              # LoginPage, SignupPage, Dashboard, Profile, etc.
├── App.js              # App-level routing
└── index.js            # Main entry point
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

> ⚠️ Make sure your **backend server** is also running and configured with the same **JWT secret** and expected API routes.

---

## 🔐 Authentication Workflow

- JWT tokens are stored in `localStorage`
- Axios sends tokens using the `Authorization` header:

```http
Authorization: Bearer <token>
```

- React Context handles user login state globally

---

## 🌗 Light & Dark Mode

- Theme toggling is available using `ThemeContext`
- Applies globally to all pages including Admin, Profile, Login, Signup

---

## 🙌 Contributing

Got a feature idea or a bug fix?  
We welcome contributions! Fork the repo, make your changes, and open a PR 🚀

---

## 📜 License

This project is licensed under the **MIT License**.

---

> 💡 Built with curiosity, creativity, and community in mind.
