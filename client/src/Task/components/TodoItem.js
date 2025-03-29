import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const TodoItem = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(task);

    const handleSubmit = (e) => {
        handleUpdate(e, newTask.completed);
    };

    const handleCheckboxChange = (e) => {
        handleUpdate(e, !newTask.completed);
    };

    const handleUpdate = async (e, completed) => {
        e.preventDefault();
        const taskToUpdate = { ...newTask, completed };
        setNewTask(taskToUpdate);
        onUpdate(taskToUpdate);
        setIsEditing(false);
    };

    return (
        <Container>
            <Row>
                <Col xs={9} md={9}>
                    {isEditing ? (
                        <Form style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }} onSubmit={handleSubmit}>
                            <Form.Group className="mb-6" controlId="formTitle">
                                <Form.Label>Task Title</Form.Label>
                                <Form.Control type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-6" controlId="formDescription">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    ) : (
                        <div className="d-flex align-items-center">
                            <input
                                type="checkbox"
                                checked={newTask.completed}
                                onChange={handleCheckboxChange}
                                className="me-2"
                            />
                            <span>{task.title}</span>
                        </div>
                    )}
                </Col>
                <Col xs={3} md={3}>
                    <div>
                        <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TodoItem;