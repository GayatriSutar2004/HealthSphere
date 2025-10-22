import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">🏥 HealthSphere</div>
    <div className="navbar-links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </div>
  </nav>
);

export default Navbar;
