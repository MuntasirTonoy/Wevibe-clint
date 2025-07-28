# 🌍 WeVibe – Social Development Events Platform

**Live Site:** [https://we-vibe-t7.web.app/](https://we-vibe-t7.web.app/)

WeVibe is a community-driven event management platform where users can create, join, and track social service events in their local area. It promotes engagement in social good initiatives such as cleanups, tree plantations, and donations.

---

## ✨ Features

- 🔐 **Authentication (Email/Password + Google Login)**
- 🎫 **Create, Join, and Manage Events** (Private/Protected Routes)
- 📆 **Date-based Filtering (Only future events shown)**
- 🔍 **Search and Filter by Event Type**
- 🎨 **Dark/Light Theme Toggle**
- 📧 **Newsletter Section (UI only)**
- 📷 **Event Gallery (Static UI)**
- 🧠 **JWT-based Authentication for Route Protection**

---

## 🗺️ Pages Overview

### ✅ Public Pages

- **Home**: Banner, features, gallery, and newsletter.
- **Login/Register**: With validation and Google sign-in support.
- **Upcoming Events**: Grid of all future events with filtering and searching.

### 🔐 Private Pages (JWT-Protected)

- **Create Event**: Create an event with title, description, date (only future allowed), etc.
- **Manage Events**: Update (and optionally delete) events created by the user.
- **Joined Events**: View all events the user has joined, sorted by date.
- **Event Details**: Detailed view of any event with "Join Event" option.

---

## 🛡️ Authentication

- Firebase authentication using Email/Password & Google
- JWT token created and stored on login
- Private routes protected with JWT verification

---

## 🖥️ Tech Stack

### Frontend

- **React**, **React Router v7**
- **Tailwind CSS**
- **Firebase Authentication**
- **Axios**, **React Datepicker**, **SweetAlert2**

### Backend

- **Node.js**, **Express.js**
- **MongoDB**
- **dotenv** for environment configuration
- **JWT** for authentication and route protection
- **CORS**, **Morgan**, **Firebase Admin SDK**

---

## 🌍 Deployment

- **Frontend** hosted on: [Firebase Hosting](https://we-vibe-t7.web.app/)

## ---developed by : Muntasir Mahmud (Tonoy)
