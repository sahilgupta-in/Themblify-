🎨 Thumblify AI Thumbnail Generator

An AI-powered Thumbnail Generator built with the MERN Stack (MongoDB, Express, React, Node.js) and TypeScript, integrated with Google Gemini API to generate high-quality YouTube thumbnails instantly.

🚀 Features

🔐 User Authentication (Register / Login / Logout)

🤖 AI-based Thumbnail Generation

🎨 Multiple Styles & Color Schemes

📐 Aspect Ratio Selection

🖼️ Download Generated Thumbnails

💾 Store Generated Thumbnails in MongoDB

⚡ Modern UI with React + TypeScript

🛠️ Tech Stack
Frontend

React

TypeScript

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

Google Gemini API

📁 Project Structure
ai-thumbnail-generator/
│
├── client/                 # Frontend (React + TS)
│   ├── src/
│   └── ...
│
├── server/                 # Backend (Node + Express + TS)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── ...
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/ai-thumbnail-generator.git
cd ai-thumbnail-generator
2️⃣ Setup Backend
cd server
npm install

Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key

Run backend:

npm run dev
3️⃣ Setup Frontend
cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:5000
🔑 Environment Variables
Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT authentication
GEMINI_API_KEY	Google Gemini API key
🔐 API Endpoints
Auth Routes

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

Thumbnail Routes

POST /api/thumbnail/generate

GET /api/thumbnail

GET /api/thumbnail/:id

📦 Build for Production
Backend
npm run build
npm start
Frontend
npm run build
🧠 Future Improvements

✅ Image History Dashboard

✅ Prompt Templates

⏳ Credit-based System

⏳ Payment Integration (Stripe)

⏳ Cloud Storage (AWS S3 / Cloudinary)

👨‍💻 Author

Sahil Gupta
BTech Computer Science
Aspiring Remote Software Developer

📄 License

This project is licensed under the MIT License.
