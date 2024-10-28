import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PasswordChange = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username);

    const handleChangePassword = async () => {
        if (!password) {
            alert('Please enter a new password.');
            return;
        }
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/users/${username}/password`, {
                newPassword: password
            });
            alert('Password updated successfully.');
            navigate('/profile');
        } catch (error) {
            alert('Failed to update password.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Change Password</h1>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default PasswordChange;
