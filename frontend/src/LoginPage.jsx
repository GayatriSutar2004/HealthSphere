import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const registeredUsers = {
  patient: [{ email: 'patient@test.com', password: '1234' }],
  doctor: [{ email: 'doctor@test.com', password: '1234' }],
  admin: [{ email: 'admin@test.com', password: '1234' }]
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userList = registeredUsers[userType];
    const foundUser = userList.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // navigate to route exactly as in App.js
      if (userType === 'patient') navigate('/patient-dashboard');
      else if (userType === 'doctor') navigate('/doctor-dashboard');
      else navigate('/admin-dashboard');
    } else {
      alert('Please register first or check your credentials!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="patient"
            checked={userType === 'patient'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Patient
        </label>
        <label>
          <input
            type="radio"
            value="doctor"
            checked={userType === 'doctor'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Doctor
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={userType === 'admin'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Admin
        </label>
      </div>

      <button className="submit-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
