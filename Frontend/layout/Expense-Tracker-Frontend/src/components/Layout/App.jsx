import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login.jsx';
import Signup from '../Auth/Signup.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import '../../assets/styleSheets/App.css';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
