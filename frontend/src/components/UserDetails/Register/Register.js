import React from 'react';
import "./Register.css";
import { useState } from 'react';
import { URL, REGISTER } from "../../constants/Constants"; 

const Register = () => {
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        try{
            const response = await fetch(URL + REGISTER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, category }),
            });

            const data = await response.json();
            console.log(data);
            setData(data);
        }catch(error){
            console.log(error);
            setData({ error: 'backend is not running'});
        }

  
    }

    return (
        <div className='register-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Enter username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input 
                        type="text" 
                        id="category"
                        placeholder="Enter category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value.toUpperCase())}
                        required 
                    />
                </div>
                <p style={{ color: data?.status ? "green" : "red",textAlign: "center" }}>{ data?.message || data?.error}</p>
                <button type="submit" className="login-button">Register</button>
                <p className="register-link">
                    Do you have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default Register;