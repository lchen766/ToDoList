import React from 'react';
import { Form } from 'react-bootstrap';

const AuthFormFields = ({ isLogin, formData, handleChange }) => {
  return (
    <>
      {!isLogin && (
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </>
  );
};

export default AuthFormFields; 