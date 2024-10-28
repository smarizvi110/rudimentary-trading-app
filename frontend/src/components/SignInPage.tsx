import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import './SignInUpPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignInUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login', { username, password });
      if (response.data) {
        dispatch(setUser({username: response.data.user.username, userId: response.data.user._id}));
        navigate('/home');
    }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Sign In</h1>
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
      {error && <p className="error-message">{error}</p>}
      <br></br>
      <button onClick={handleSignIn}>Sign In</button>
      <p>Don't have an account? <Link to='/sign-up' className="signinup-link">Sign Up!</Link></p>
    </div>
  );
};

export default SignInUpPage;
