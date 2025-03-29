import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/UserRoutes.js';
import taskRoutes from './routes/TaskRoutes.js';

const app = express();

dotenv.config( { path: './config.env'});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);  // This will handle /api/register and /api/login
app.use('/api/tasks', taskRoutes);  // This will handle all task-related endpoints

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const __dirname = path.dirname("");
const buildPath = path.join(__dirname, '../client/build');

app.use(express.static(buildPath));

app.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});

// start the Express server
mongoose
    .connect(process.env.ATLAS_URI)
    .then( () => {
        const PORT = process.env.PORT || 5050;
        app.listen(PORT, ()  => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
});