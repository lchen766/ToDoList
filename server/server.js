const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');

const app = express();

dotenv.config( { path: './config.env'});

app.use(cors());
app.use(express.json());
// app.use("/record", records);

// Routes
app.use('/api', userRoutes);  // This will handle /api/register and /api/login
app.use('/api/tasks', taskRoutes);  // This will handle all task-related endpoints

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

console.log(process.env.ATLAS_URI);
// start the Express server
mongoose
    .connect(process.env.ATLAS_URI)
    .then( () => {
        app.listen(process.env.PORT);
        console.log("Server is running on port", process.env.PORT);
    })
    .catch((error) => {
        console.log(error);
});