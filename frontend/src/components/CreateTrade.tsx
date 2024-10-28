import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import Navbar from './NavBar';

const CreateTrade = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState<String | null>(null);
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username); // Assuming Redux state holds the username

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/${username}`);
                if (response.data) {
                    setUserId(response.data._id); // Assuming the user object contains an _id field
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error('Failed to fetch user ID:', error);
                alert('Failed to fetch user details. Please log in again.');
                navigate('/'); // Redirect to login page
            }
        };

        if (username) {
            fetchUserId();
        }
    }, [username, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userId) {
            alert('User ID not found. Unable to create trade.');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/trades', {
                userId,
                title,
                description
            });
            alert('Trade created successfully!');
            navigate('/profile'); // Navigate to the profile page after successful creation
        } catch (error) {
            console.error('Failed to create trade:', error);
            alert('Error creating trade. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Create a New Trade</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <button type="submit">Create Trade</button>
            </form>
        </div>
    );
};

export default CreateTrade;
