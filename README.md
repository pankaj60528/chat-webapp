# 💬 Pankaj's Real-Time Chat Application

A modern, full-stack real-time chat application built with the MERN stack and Socket.io.

![Demo App](/frontend/public/screenshot-for-readme.png)

## Features

- 🌟 **Tech Stack**: MERN + Socket.io + TailwindCSS + Daisy UI
- 🔐 **Authentication & Authorization** with JWT
- � **Real-time messaging** with Socket.io
- � **Online user status** tracking
- � **Global state management** with Zustand
- �️ **Error handling** on both server and client
- 📱 **Responsive design** for all devices
- ⚡ **Fast and efficient** real-time communication

## Technology Stack

### Frontend
- React 18
- Vite
- TailwindCSS + DaisyUI
- Socket.io Client
- Zustand (State Management)
- React Router DOM
- Axios
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Cloudinary for image uploads

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd fullstack-chat-app
```

### 2. Environment Setup
Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-here

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

NODE_ENV=development
```

### 3. Install Dependencies & Build
```bash
npm run build
```

### 4. Start the Application
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## Usage

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your account with your credentials
3. **Start Chatting**: 
   - Search for users to start conversations
   - Send real-time messages
   - Share images
   - See online status of other users
4. **Profile**: Update your profile picture and information

## Project Structure

```
fullstack-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── main.jsx
│   └── package.json
├── package.json
└── README.md
```

## Contributing

This is a personal project. Feel free to fork and modify for your own use.

## License

MIT License - feel free to use this project for learning or personal purposes.

---

**Built with ❤️ by Pankaj**
