import React from "react";

function UpdatePassword({ password, setPassword, updatePassword }) {
    return (
        <div className="update-password-container">
            <div className="update-password-form">
                <label>
                    Set New Password:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                />
                <button onClick={updatePassword}>Update Password</button>
            </div>
        </div>
    );
}

export default UpdatePassword;
