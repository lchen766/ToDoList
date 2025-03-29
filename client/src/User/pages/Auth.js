import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../../contexts/AuthProvider';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const { onLogin, onSignup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (isLogin) {
            try {
                await onLogin(formData.email, formData.password);
                navigate('/todos');
            } catch (error) {
                setError('An error occurred. Please try again.');
            }
        } else {
            try {
                await onSignup(formData.name, formData.email, formData.password);
                navigate('/todos');
            } catch (error) {
                setError(error.response.data.error);
            }
        }
    };

    const handleSwitch = () => {
        setIsLogin(!isLogin);
        setFormData({});
        setError('');
    };

    return (
        <AuthLayout
            title={isLogin ? 'Login' : 'Sign Up'}
            footer={
                <Button variant="link" onClick={handleSwitch}>
                    Switch to {isLogin ? 'Sign Up' : 'Login'}
                </Button>
            }
        >
            <AuthForm
                isLogin={isLogin}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
            />
        </AuthLayout>
    );
};

export default Auth;