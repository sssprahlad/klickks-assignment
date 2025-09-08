import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";   
import Cookies from 'js-cookie';
import { URL, LOGIN } from "../../constants/Constants";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);


   try {
      const response = await fetch(URL + LOGIN, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (data?.status) {
        Cookies.set('jwt_token', data.token);
        Cookies.set('category', data.category);
        Cookies.set('userId', data.userId);
        Cookies.set('username', data.username);
        const from = location.state?.from?.pathname || '/home';
        navigate(from, { replace: true });
      } else {
        setData({ error: data.error}); 
      }
    } catch (error) {
      console.error('Login error:', error);
      setData({ error: 'backend is not running'});
    }


  };

  return (
    
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{ color: "red",textAlign: "center" }}>{ data?.error}</p>
        <button type="submit">Login</button>
        <p style={{ textAlign: "center" }}>Don't have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
}

export default Login;
