import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'; // Assuming all auth styles are here

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // 💡 Add state management for form inputs (Best practice for React forms)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('patient'); // Default to patient

    const handleRegister = (e) => {
        e.preventDefault();
        
        // 🚨 Note: In a real app, you would send this data to an API.
        // For this demo, we'll just alert and navigate.
        if (name && email && password) {
            alert(`Registered ${name} as a ${userType}. Please log in.`);
            navigate('/login'); // Redirect to login after registration
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        // 🔑 THE FIX: Use the centering wrapper (styled in App.css)
        <div className="auth-page-container">
            <form className="auth-container" onSubmit={handleRegister}>
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Reusing the styled radio group for user type selection */}
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
                
                {/* Use the common submit-btn class */}
                <button type="submit" className="submit-btn">
                    Register
                </button>

                {/* Link back to login */}
                <Link to="/login" className="auth-switch-link">
                    Already have an account? Login here.
                </Link>
            </form>
        </div>
    );
};

export default RegisterPage;