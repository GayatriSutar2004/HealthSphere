import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('patient');

    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // 📱 Step 1: Send OTP via backend
    const handleSendOtp = async () => {
        if (phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            if (response.ok) {
                setIsOtpSent(true);
                alert(`otp sent to ${phone}`);
            } else {
                const data = await response.json();
                alert(`❌ Failed to send OTP: ${data.message}`);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Server error while sending OTP.');
        }
    };

    // 🔹 Step 2: Verify OTP via backend
    const handleVerifyOtp = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp }),
            });

            if (response.ok) {
                setIsVerified(true);
                alert('✅ Phone number verified successfully!');
            } else {
                alert('❌ Incorrect OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Server error while verifying OTP.');
        }
    };

    // 🔹 Step 3: Final Registration
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !phone) {
            alert('Please fill out all fields.');
            return;
        }

        if (!isVerified) {
            alert('Please verify your phone number before registering.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone, userType }),
            });

            if (response.ok) {
                alert('🎉 Registration successful! Please log in.');
                navigate('/login');
            } else {
                const data = await response.json();
                alert(`❌ Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Server error during registration.');
        }
    };

    return (
        <div className="auth-page-container">
            <form className="auth-container" onSubmit={handleRegister}>
                <h2>Register</h2>

                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                {/* OTP Section */}
                {!isVerified && (
                    <div className="otp-section">
                        {!isOtpSent ? (
                            <button type="button" className="otp-btn" onClick={handleSendOtp}>
                                Send OTP
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button type="button" className="submit-btn" onClick={handleVerifyOtp}>
                                    Verify OTP
                                </button>
                            </>
                        )}
                    </div>
                )}

                {isVerified && <p className="otp-verified">✅ Phone verified</p>}

                {/* User type */}
                <div className="radio-group">
                    <label><input type="radio" value="patient" checked={userType === 'patient'} onChange={(e) => setUserType(e.target.value)} /> Patient</label>
                    <label><input type="radio" value="doctor" checked={userType === 'doctor'} onChange={(e) => setUserType(e.target.value)} /> Doctor</label>
                    <label><input type="radio" value="admin" checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} /> Admin</label>
                </div>

                <button type="submit" className="submit-btn">Register</button>
                <Link to="/login" className="auth-switch-link">Already have an account? Login here.</Link>
            </form>
        </div>
    );
};

export default RegisterPage;
