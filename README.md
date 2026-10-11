# Department Notice Board

A small full-stack Internet Programming project using React + TypeScript, Vite, Node.js, Express, and MongoDB.

## Requirements
- Node.js 18+ and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Setup
1. Open this folder in VS Code.
2. In the terminal, install dependencies:
   ```bash
   npm install
   npm run install:all
   ```
3. In `server/.env`, set your MongoDB connection string. For local MongoDB, the included default is:
   `mongodb://127.0.0.1:27017/department_notice_board`
4. Start both frontend and backend:
   ```bash
   npm run dev
   ```
5. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

Backend endpoints:
- `GET http://localhost:5000/`
- `GET http://localhost:5000/faculty`
- `GET http://localhost:5000/api/notices`
- `POST http://localhost:5000/api/notices` with JSON `{ "title": "...", "message": "..." }`

If MongoDB is not running, the API shows a helpful error and the frontend displays the connection problem. Notices are stored in MongoDB and remain after refreshing the page.
