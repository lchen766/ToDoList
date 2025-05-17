import axios from "axios";
import {
  createContext,
  useContext,
  useState,
} from "react";

const BASE_URL = 'http://localhost:5050';
// Create the AuthContext to hold authentication data
const AuthContext = createContext(
  {
    token: null,
    onLogin: () => {},
    onSignup: () => {},
    onLogout: () => {},
  }
);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));


  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, { name, email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      return response.data; 
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  
  const value = {
    token,
    onLogin: handleLogin,
    onSignup: handleSignup,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;