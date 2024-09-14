import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/clientHeader.css'; // Ensure you have the correct path to the CSS file

const ClientHeader = () => {
  const handleLogout = () => {
    Auth.logout(); // Call your logout function from the auth utility
  };

  return (
    <header className="header">
      <div className="container">
        <h1>GitFit</h1>
        <p>Welcome Back! Manage Your Fitness Goals</p>
      </div>
      <nav className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/add-exercise">Add an Exercise</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ClientHeader;
