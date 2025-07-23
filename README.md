# 🐝 Beekeeper Blog

Welcome to **Beekeeper Blog** — a lightweight blog platform built for hive minds. Whether you're a seasoned beekeeper or just buzzing with curiosity, this app lets users create and share posts related to bees, nature, and all things golden.

<div align=center >
  
  ![Logo](src/Assets/logo_bg.png)
  
</div>

---

## 🚀 Features

- 🧑‍💻 **Authentication**
  - Login and Registration pages
  - Secure access and user identification

- 📚 **Blog Pages**
  - View all public blogs on the `/blogs` page
  - Dynamic blog detail page `/blogs/:id` to read each post in full

- ✍️ **Create Blog**
  - Logged-in users can create new blog posts
  - Blog data includes title, description, body, author info, and timestamp

---

## 🔐 Authentication Requirement

To create a blog, users **must be logged in** via:
- localStorage credentials (email & name)
- or an active `UserContext` session (used across components)

Unauthenticated users are redirected to the login/register options.

---

## 🛠 Tech Stack

- **React.js** for frontend
- **React Router DOM** for navigation
- **Axios** for API requests
- **JSON Server** for mock backend
- **CSS Modules** for styling

---

---

## 🧑‍💻 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/yourusername/beekeeper-blog.git

# Navigate to the folder
cd beekeeper

# Install dependencies
npm install


# Run the app // the react and json server will start automaticaly
npm start


