# Library Management System

[![Library Management](https://img.shields.io/badge/Library-Management-brightgreen)](https://library-assignment-zeta.vercel.app/)

📌 **Live Demo**: [Library Management System](https://library-assignment-zeta.vercel.app/)

📌 **GitHub Repository**: [Library-Assignment](https://github.com/mohammadkaifshaikh01/Library-Assignment)

## 📖 Overview
The **Library Management System** is a full-stack web application designed to manage books efficiently. It allows users to browse books, search for specific titles, add new books, and view details with an enhanced UI.

## ✨ Features
- 📚 **Book Collection** – View a list of available books with title, author, and genre.
- 🔎 **Search Functionality** – Search books by title or author.
- 📖 **Detailed Book View** – Click on a book to view its full details in a popup.
- ➕ **Add New Books** – Admin can add new books to the collection.
- 🔒 **Authentication** – User login and role-based access (Admin/User).

## 🛠 Tech Stack
### **Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (API calls)

### **Backend:**
- Node.js (Express.js)
- MongoDB (Mongoose)
- Cloudinary (Image Uploads)
- Multer (File Handling)
- JWT Authentication

## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/mohammadkaifshaikh01/Library-Assignment.git
 cd Library-Assignment
```

### **2️⃣ Install Dependencies**
#### 📌 **Frontend**
```sh
cd frontend
npm install
npm run dev
```
#### 📌 **Backend**
```sh
cd backend
npm install
npm start
```

## 🔧 Environment Variables
Create a `.env` file in the `backend` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎯 API Endpoints
| Method | Endpoint          | Description        |
|--------|------------------|--------------------|
| GET    | `/books`         | Get all books     |
| POST   | `/books/add-book`         | Add new book      |
| GET    | `/books/:id`     | Get book details  |

## 📌 Contribution
1. Fork the repository
2. Create a new branch (`feature-new`)
3. Commit changes and push (`git push origin feature-new`)
4. Create a Pull Request

## 📜 License
This project is **MIT licensed**.

🚀 **Happy Coding!** ✨

