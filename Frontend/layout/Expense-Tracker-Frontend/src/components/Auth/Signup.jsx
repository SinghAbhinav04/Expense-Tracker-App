import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../assets/styleSheets/Signup.css"

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        let message = '';

        if (password.length < minLength) {
            message = 'Password must be at least 8 characters long.';
        } else if (!hasNumber.test(password)) {
            message = 'Password must include at least one number.';
        } else if (!hasUpperCase.test(password)) {
            message = 'Password must include at least one uppercase letter.';
        } else if (!hasSpecialChar.test(password)) {
            message = 'Password must include at least one special character.';
        } else {
            message = 'Password is strong.';
            setPasswordValid(true);
        }

        setPasswordMessage(message);
    };

    const createUser = async (e) => {
        e.preventDefault();
        const user = { name, email, password };
        try {
            await axios.post('http://localhost:8080/api/user', user);
            alert('User created successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Error creating user');
        }
    };

    const redirectToLogin = () => {
        navigate("/");
    };

    return (
        <div className="signup-wrapper">
            <h1>Expense Tracker App</h1>
            <div className="signup-container">
                <h2 className="signup-heading">Signup</h2>
                <form onSubmit={createUser}>
                    <input
                        className="signup-input"
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="signup-input"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="signup-input"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
                    />
                    <p className={passwordValid ? "password-valid" : "password-invalid"}>
                        {passwordMessage}
                    </p>
                    <button className="signup-button" type="submit" disabled={!passwordValid}>
                        Signup
                    </button>
                    <p className="redirect-p">
                        Already have an account?
                        <button className="redirect-button" onClick={redirectToLogin}>Login page</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
