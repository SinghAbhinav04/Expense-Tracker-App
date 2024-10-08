import React from "react";

function UpdateName({ name, setName, updateName }) {
    return (
        <div className="update-name-container">
            <div className="update-name-form">
                <label>
                    Set New Name:
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button onClick={updateName}>Update Name</button>
            </div>
        </div>
    );
}

export default UpdateName;
