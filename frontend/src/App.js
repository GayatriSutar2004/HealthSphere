import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

const images = [
  '/Assets/hospital1.jpg',
  '/Assets/hospital2.jpg',
  '/Assets/hospital3.jpg'
];

function App() {
  const [title, setTitle] = useState('Default value');
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fix: Correct arrow function syntax in fetch
  useEffect(() => {
    fetch("http://localhost:8080/home")
      .then(response => response.text())
      .then(text => setTitle(text))
      .catch(error => console.error("Error fetching:", error));
  }, []);

  // ✅ Slideshow logic for hospital images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>React + {title}</h1>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage images={images} currentIndex={currentIndex} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
