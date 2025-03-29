import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthFormFields from '../components/AuthFormFields';

const AuthForm = ({ isLogin, formData, handleChange, handleSubmit, error }) => {
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <AuthFormFields
            isLogin={isLogin}
            formData={formData}
            handleChange={handleChange}
        />

        <Button variant="primary" type="submit" className="w-100">
            {isLogin ? 'Login' : 'Sign Up'}
        </Button>
    </Form>
  );
};

export default AuthForm; 