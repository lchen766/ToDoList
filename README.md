# How to run project
1. Install the necessary dependencies listed in package.json.
```bash
npm install
```
2. Start the project. 
```bash
npm run dev
```

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

