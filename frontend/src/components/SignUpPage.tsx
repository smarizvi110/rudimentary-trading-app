import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignInUpPage.css';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [itemsOwned, setItemsOwned] = useState(0);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSignUp = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/users', { username, password, itemsOwned });
        if (response.data) {
          dispatch(setUser({username: response.data.user.username, userId: response.data.user._id}));
          navigate('/home');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<{ message: string }>;
          if (serverError && serverError.response) {
            setError(serverError.response.data.message || 'Failed to sign up. Please try again.');
          } else {
            setError('Failed to sign up. Please check your network connection.');
          }
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    };
  
    return (
      <div className="container">
        <h1 className="heading">Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="itemsOwned">Items Owned (if signing up)</label>
        <input
          type="number"
          id="itemsOwned"
          placeholder="Items Owned"
          value={itemsOwned}
          onChange={(e) => setItemsOwned(parseInt(e.target.value, 10) || 0)}
          min="0"
          step="1"
        />
        {error && <p className="error-message">{error}</p>}
        <br></br>
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Have an account? <Link to='/' className="signinup-link">Sign In!</Link></p>
      </div>
    );
  };
  
export default SignUpPage;
  