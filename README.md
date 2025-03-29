# How to run project
## For the Backend
0. If you want to connect with your own MongoDB Databse, you can go to server/config.env, and change ATLAS_URI with your own connection string in your application.

1. Change the directory to server
```bash
cd server
```
2. Install the necessary dependencies listed in package.json.
```bash
npm install
```
3. Start the project. 
```bash
npm start
```
If the backend runs successfully, it would show "Server is running on port 5050"

## For the Frontend
1. Change the directory to server
```bash
cd ../client
```
2. Install the necessary dependencies listed in package.json.
```bash
npm install
```
3. Start the project. 
```bash
npm start
```
If the frontend runs successfully, it would be running on http://localhost:3000

# File Directory
```bash
TODOLIST
│── client/                 # Frontend codebase
│   │── src/  
│   │   ├── context/        # Context API for global state management
│   │   ├── services/       # API service functions for backend communication
│   │   ├── Task/           # Task-related components and pages
│   │   │   ├── components/ 
│   │   │   └── pages/      
│   │   └── User/           # User-related components and pages
│   │       ├── components/
│   │       └── pages/
│   │── App.js              # Root component for the frontend
│   └── index.js            # Entry point for the React application
└── server/                 # Backend codebase
    │── models/             # Database models
    │── routes/             # API routes for different functionalities
    │── middleware/         # Middleware for authentication, logging, etc.
    │── controllers/        # Business logic handling API requests
    └── server.js           # Main entry point for the backend server
```

