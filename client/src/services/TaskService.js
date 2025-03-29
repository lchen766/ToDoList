import axios from 'axios';

// API Base URL
const BASE_URL = 'https://lilin-todo-list-backend-658bdd22a801.herokuapp.com/api/tasks';

// Function to get all tasks
export const getTasks = async (token) => {
    return await axios.get(BASE_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.data.tasks;
    });
};

// Function to create a new task
export const createTask = async (taskData, token) => {
    return await axios.post(BASE_URL, taskData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => {
        return response.data.task;
    });
};

// Function to update a task
export const updateTask = async (taskData, token) => {
    return await axios.put(`${BASE_URL}/${taskData.id}`, taskData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => {
        return response.data.task;
    });
}

// Function to delete a task
export const deleteTask = async (taskId, token) => {
    return await axios.delete(`${BASE_URL}/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
    }}).then(response => {
        return response.data;
    });
}
