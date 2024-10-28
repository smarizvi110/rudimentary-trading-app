import React from 'react';
import Navbar from './NavBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 style={{ fontSize: '48px' }}>Terrifically Terrible Trading (Tr)App</h1>
        <div className="homepage-logo-container"> {/* Changed class name for specificity */}
          <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="homepage-logo-link">
            <img src="/logo.png" alt="Trading App" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
