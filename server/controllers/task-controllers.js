import Task from '../models/Task.js';

// Get Tasks: GET /api/tasks
const getTasks = async (req, res) => {
    const user = req.user;
    let tasks;
    try {
        tasks = await Task.find({ user: user._id });
    } catch (err) {
        return res.status(500).json({ error: "Fetching tasks failed, please try again!"})
    }
    res.status(200).json({ tasks: tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        // updatedAt: task.updatedAt
    })) });
}

// Create Task: POST /api/tasks
const createTask = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;

    let existingTask;
    try {
        existingTask = await Task.findOne({ title: title, user: user._id });
    } catch (err) {
        return res.status(500).json({ error: "Creating task failed, please try again!"})
    }

    if (existingTask) {
        return res.status(400).json({ error: "Task already exists!"})
    }

    const task = new Task({
        title,
        description,
        user: user._id
    });

    try {
        await task.save();
    } catch (err) {
        return res.status(500).json({ error: "Creating task failed, please try again!"})
    }

    res.status(201).json({
        task: {
            id: task._id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            createdAt: task.createdAt,
        }
    });
}

// Update Task: PUT /api/tasks/:id
const updateTask = async (req, res) => {
    const { title, description, completed } = req.body;
    const user = req.user;
    const taskId = req.params.id;

    let task;
    try {
        task = await Task.findOne({ _id: taskId, user: user._id });
    } catch (err) {
        return res.status(500).json({ error: "Updating task failed, please try again!"})
    }

    if (!task) {
        return res.status(404).json({ error: "Task not found!"})
    }

    let existingTask;
    try {
        existingTask = await Task.findOne({ title: title, user: user._id });
    } catch (err) {
        return res.status(500).json({ error: "Updating task failed, please try again!"})
    }

    if (existingTask && existingTask._id.toString() !== taskId) {
        return res.status(403).json({ error: "Task with this title already exists!"})
    }
    

    if (title !== undefined) {
        task.title = title;
    }
    if (description !== undefined) {
        task.description = description;
    }
    if (completed !== undefined) {
        task.completed = completed;
    }
    try {
        await task.save();
    } catch (err) {
        return res.status(500).json({ error: "Updating task failed, please try again!"})
    }

    res.status(200).json({
        task: {
            id: task._id,
            title: task.title,
            description: task.description
        }
    })
}

// Delete Task: DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const user = req.user;

    let task;
    try {
        task = await Task.findOne({ _id: taskId, user: user._id });
    } catch (err) {
        return res.status(500).json({ error: "Deleting task failed, please try again!"})
    }

    if (!task) {
        return res.status(404).json({ error: "Task not found!"})
    }

    try {
        await Task.deleteOne({ _id: taskId });
    } catch (err) {
        return res.status(500).json({ error: "Deleting task failed, please try again!"})
    }

    res.status(200).json({ message: "Task deleted successfully!"})
}

export default {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}