import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';
import './NavBar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="logo-link">
        <img src="/logo.png" alt="Trading App" />
      </a>
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/browse" className="nav-link">Browse</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </nav>
  );
};

export default Navbar;
