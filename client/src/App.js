import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './Task/pages/Todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './User/pages/Auth';
import AuthProvider from './contexts/AuthProvider';
import { useAuth } from './contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/auth" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/todos" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
