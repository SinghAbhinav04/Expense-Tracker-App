import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../assets/styleSheets/Login.css"
const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();

        if (token && expiration && currentTime < parseInt(expiration)) {
            if (window.location.pathname !== '/dashboard') {
                navigate('/dashboard');
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
        }
    }, [navigate]);

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/user/login?email=${email}&password=${password}`);
            const token = response.data;

            localStorage.setItem('token', token);
            const expirationTime = new Date().getTime() + 3600000;
            localStorage.setItem('tokenExpiration', expirationTime);

            setUser(email);
            localStorage.setItem('userEmail', email);

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Error logging in');
        }
    };

    const redirectToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-wrapper">
            <h1 className="login-heading">
                Expense Tracker App
            </h1>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                        <label className="input-placeholder">Email</label>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                        <label className="input-placeholder">Password</label>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="signup-section">
                    <p className="signup-redirect">Don't have an account? <button className="signup-text" onClick={redirectToSignup}>Sign up now</button></p>
                </div>
            </div>
        </div>

    );
};

export default Login;
