import React, { useState, useEffect } from 'react';
import { Alert, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem'
import { getTasks, createTask, updateTask, deleteTask } from '../../services/TaskService';
import { useAuth } from '../../contexts/AuthProvider';
import { Card, Button, Container, Row, Col, Form, Stack } from 'react-bootstrap';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, onLogout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(token);
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      setError('Title and description are required');
      return;
    }
    try {
      const taskData = {
        title: newTask.title,
        description: newTask.description,
      };
      const createdTask = await createTask(taskData, token);
      console.log("createdTask in Todolist: " + JSON.stringify(createdTask));
      setTasks([
        ...tasks, 
        createdTask
      ]);
      setNewTask({});
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(
        tasks.filter(task => task.id !== id)
      )
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleUpdateTask = async (newTask) => {
    console.log("newTask in Todolist: " + JSON.stringify(newTask));
    try {
      await updateTask(newTask, token);
      setTasks(
        tasks.map(
          task => task.id === newTask.id ? { 
            ...task, 
            title: newTask.title, 
            description: newTask.description,
            completed: newTask.completed
          } : task)
      )
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleClearCompleted = async() => {
    try {
      const completedTasks = tasks.filter(task => task.completed)
      await Promise.all(completedTasks.map(task => deleteTask(task.id, token)));
      setTasks(tasks.filter(task => !task.completed))
    } catch (err) {
      setError('Failed to clear completed tasks');
    }
  };


  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Separate active and completed todos
  // const activeTodos = tasks.filter(task => !task.completed);
  // const completedTodos = tasks.filter(task => task.completed);
  const activeTodos = tasks.filter(task => !task.completed);
  const completedTodos = tasks.filter(task => task.completed);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card>
        <Card.Header>
          <Card.Title>
            My Todo List
            <Button variant="primary" onClick={handleLogout} className="float-end" size="sm">Logout</Button>
          </Card.Title>
        </Card.Header>
        <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
          <Container>
            <Form onSubmit={handleAddTask} className="mb-4">
              <Form.Group className="mb-3" controlId="title">
                <FloatingLabel
                  label="Title"
                >
                  <Form.Control
                    type="text"
                    placeholder="Add a new todo title..."
                    value={newTask.title || ''}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <FloatingLabel
                  label="Description"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Add a new todo description..."
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </FloatingLabel>
                <Button type="submit" variant="primary" className="float-end">Add Todo</Button>
              </Form.Group>
            </Form></Container>

          {/* Active Todos Section */}
          <Container>
            <Row>
              <Col>
                <h5 className="mb-3">Active Todos</h5>
              </Col>
            </Row>
            <Row>
                {activeTodos.length === 0 ? (
                  <p className="text-center text-muted">No active todos. Add one above!</p>
                ) : (
                  <Stack gap={3}>
                    {activeTodos.map(task => (
                      <TodoItem
                        key={task.id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTask}
                      />
                    ))}
                  </Stack>
                )}
            </Row>
          </Container>

          {/* Completed Todos Section */}
          <Container style={{ marginTop: '50px' }}>
            <Row>
              <Col>
                <h5 className="mb-3">Completed Todos</h5>
              </Col>
            </Row>
            <Row>
              {completedTodos.length === 0 ? (
                <p className="text-center text-muted"> No completed tasks yet</p>
              ) : (
                <Stack gap={3}>
                  {
                    completedTodos.map(task => (
                      <TodoItem
                        key={task.id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTask}
                      />
                    ))}
                </Stack>
              )}
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          {activeTodos.length} todos left
          {completedTodos.length > 0 && (
            <Button variant="secondary" onClick={handleClearCompleted} className="float-end" size="sm"> Clear Completed Tasks </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default TodoList;