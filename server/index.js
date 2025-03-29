require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB


// Routes
app.use('/api', userRoutes);  // This will handle /api/register and /api/login
app.use('/api/tasks', taskRoutes);  // This will handle all task-related endpoints

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

mongoose
    .connect('mongodb+srv://lchen:lchen0401@todolist.lyipmj6.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList')
    .then( () => {
        app.listen(5000);
        console.log("Server is running on port 3000");
    })
    .catch((error) => {
        console.log(error);
});