import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css'; // Import specific CSS for Header

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div>
          <h1>GitFit</h1>
          <p>Your Fitness Journey Starts Here!</p>
        </div>
      </div>
      <nav className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/add-exercise">Add an Exercise</Link>
          </li>
          <li>
            {Auth.loggedIn() ? (
              <Link to="/" onClick={Auth.logout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
