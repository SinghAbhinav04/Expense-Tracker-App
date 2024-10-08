import { React, useState } from "react";
import UpdatePassword from "./UpdatePassword.jsx";
import UpdateName from "./UpdateName.jsx";
import axios from 'axios';
import "../../assets/styleSheets/UpdateUser.css"

function UpdateUser({ closePopup }) {
    const [name, setName] = useState('');
    const [activeComponent, setActiveComponent] = useState('password');

    const renderActiveContent = () => {
                return <UpdateName name={name} setName={setName} updateName={handleUpdateName} />;
    };

    const email = localStorage.getItem("userEmail");



    const handleUpdateName = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/update-name',null, {
                params: {
                    email,
                    name
                }
            });
            alert('Name updated successfully!');
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    return (
        <div className="popup-container">
            <div className="update-popup">
                <div className="close-button" onClick={closePopup}>×</div>

                <div className="sidebar-section">
                    <button onClick={() => setActiveComponent("username")}>Update User Name</button>
                </div>

                <div className="content-section">
                    {renderActiveContent()}
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
