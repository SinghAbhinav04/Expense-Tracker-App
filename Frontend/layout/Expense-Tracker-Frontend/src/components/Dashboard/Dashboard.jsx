import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ExpenseChart from '../ExpenseChart/ExpenseChart.jsx';
import Expenses from '../Expenses/Expenses.jsx';
import UpdateUser from "../profile/UpdateUser.jsx";
import "../../assets/styleSheets/Dashboard.css"

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('chart');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const navigate = useNavigate();

    const userEmail = localStorage.getItem('userEmail') || 'User';

    const fetchUsers = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axios.get('http://localhost:8080/api/user', { params: { email } });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'expenses':
                return <Expenses />;
            case 'chart':
            default:
                return <ExpenseChart />;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    const toggleUserModal = () => {
        setIsUserModalOpen(!isUserModalOpen);
    };

    return (
        <div className="dashboard-layout">
            <div className="sidebar">
                <h3>Welcome,
                    <ul className="user-list-items">
                        {users.map((user) => (
                            <li key={user.id} className="user-list-item">{user.name}</li>
                        ))}
                    </ul>
                </h3>
                <nav className="sidebar-links">
                    <button onClick={() => setActiveComponent('chart')}>Dashboard</button>
                    <button onClick={() => setActiveComponent('expenses')}>Expenses</button>
                    <button onClick={toggleUserModal}>Update User</button>
                </nav>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="main-content">
                {renderActiveComponent()}
            </div>

            {isUserModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={toggleUserModal}>X</button>
                        <UpdateUser closePopup={toggleUserModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
