import React, { useState } from 'react';
import { jsPDF } from "jspdf";

import './App.css';

// 🛑 FIX 1: ACCEPT ONLOGOUT PROP 🛑
const PatientDashboard = ({ onLogout }) => { 
  const [activeTab, setActiveTab] = useState('dashboard');

  const [appointments, setAppointments] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);

  const downloadPDF = (title, data) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(12);

    let y = 30;
    Object.entries(data).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 14, y);
      y += 8;
    });

    doc.save(`${title}.pdf`);
  };

  const [prescriptions, setPrescriptions] = useState([
    {
      date: '2025-10-01',
      doctor: 'Dr. John',
      medicines: 'Paracetamol 500mg, Cough Syrup',
      status: 'Active',
    },
    {
      date: '2025-09-10',
      doctor: 'Dr. Smith',
      medicines: 'Ibuprofen 400mg',
      status: 'Completed',
    },
  ]);

  const [editProfile, setEditProfile] = useState(false);

  const defaultPatientInfo = {
    name: 'John Doe',
    age: 32,
    address: '123, Health St., City',
    contact: '+91-9876543210',
    email: 'patient@test.com',
    bloodType: 'O+',
    healthIssues: 'Asthma'
  };

  // ✅ Fix: define patientInfo as state
  const [patientInfo, setPatientInfo] = useState(defaultPatientInfo);

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    setEditProfile(false);
  };

  const [medicalRecords, setMedicalRecords] = useState([
    {
      date: '2025-09-10',
      doctor: 'Dr. John',
      diagnosis: 'Flu',
      treatment: 'Medication A',
    },
    {
      date: '2025-08-15',
      doctor: 'Dr. Smith',
      diagnosis: 'Back Pain',
      treatment: 'Physiotherapy',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    date: '',
    time: '',
    symptoms: '',
    type: 'online',
  });

  const [waitingList, setWaitingList] = useState([]);

  // 🛑 FIX 2: CHANGE HANDLER TO CALL PROP 🛑
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens.
    // We now call the function passed from the parent to handle navigation.
    if (onLogout) {
      onLogout();
    } else {
      // Fallback for standalone use (or if no router is set up)
      window.location.reload(); 
    }
  };
  // ----------------------------------------

  const handleEmergency = () => alert('Hospital has been notified about your emergency!');

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const id = appointments.length + 1;
    const appointment = { id, ...newAppointment };
    setAppointments([...appointments, appointment]);

    // Add to waiting list
    setWaitingList([...waitingList, { name: patientInfo.name, time: newAppointment.time, type: newAppointment.type }]);

    alert('Appointment booked successfully!');
    setNewAppointment({ doctor: '', date: '', time: '', symptoms: '', type: 'online' });
  };

  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter((a) => a.id !== id);
    setAppointments(updatedAppointments);

    const updatedWaiting = waitingList.filter((w) => w.time !== appointments.find(a => a.id === id)?.time);
    setWaitingList(updatedWaiting);
  };

  const handleVideoCall = (appointment) => {
    window.open('https://meet.jit.si/' + appointment.doctor.replace(/\s/g, '') + Date.now(), '_blank');
    setVideoHistory([...videoHistory, { ...appointment, dateTime: new Date().toLocaleString() }]);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>HealthSphere</h2>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('appointments')}>Appointments</button>
        <button onClick={() => setActiveTab('records')}>Medical Records</button>
        <button onClick={() => setActiveTab('prescriptions')}>Prescriptions</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button className="emergency-btn" onClick={handleEmergency}>🚨 Emergency</button>
        {/* The onClick remains the same, calling the updated handleLogout */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <h2>Dashboard - Waiting List</h2>
            <table className="waiting-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Time</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {waitingList.map((w, idx) => (
                  <tr key={idx}>
                    <td>{w.name}</td>
                    <td>{w.time}</td>
                    <td>{w.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="book-btn" onClick={() => setActiveTab('appointments')}>Book Appointment</button>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="appointment-container">
            <h2>Book Appointment</h2>
            <form className="auth-container" onSubmit={handleAppointmentSubmit}>
              {/* 🛑 FIX: WRAPPING INPUTS IN FORM-GRID FOR LAYOUT 🛑 */}
              <div className="form-grid"> 
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  required
                />
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  required
                />
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  required
                />
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              {/* 🛑 END FORM-GRID 🛑 */}
              
              <textarea
                placeholder="Symptoms"
                value={newAppointment.symptoms}
                onChange={(e) => setNewAppointment({ ...newAppointment, symptoms: e.target.value })}
                required
              />
              <button type="submit" className="book-btn">Book Appointment</button>
            </form>

            <h3>Your Appointments</h3>
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Symptoms</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.doctor}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>{app.symptoms}</td>
                    <td>{app.type}</td>
                    <td>
                      {app.type === 'online' && (
                        <button className="video-call-btn" onClick={() => handleVideoCall(app)}>Start Video Call</button>
                      )}
                      <button className="cancel-btn" onClick={() => handleCancel(app.id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Video Call History</h3>
            <table className="video-history-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {videoHistory.map((v, idx) => (
                  <tr key={idx}>
                    <td>{v.doctor}</td>
                    <td>{v.dateTime}</td>
                    <td>{v.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* RECORDS TAB */}
        {activeTab === 'records' && (
          <div>
            <h2>Medical Records</h2>
            {medicalRecords.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalRecords.map((record, idx) => (
                    <tr key={idx}>
                      <td>{record.date}</td>
                      <td>{record.doctor}</td>
                      <td>{record.diagnosis}</td>
                      <td>{record.treatment}</td>
                      <td>
                        <button
                            className="download-btn"
                            onClick={() =>
                                downloadPDF("Medical Record", {
                                Date: record.date,
                                Doctor: record.doctor,
                                Diagnosis: record.diagnosis,
                                Treatment: record.treatment,
                                })
                            }
                        >
                            Download
                        </button>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div>
            <h2>Prescriptions</h2>
            {prescriptions.length === 0 ? (
              <p>No prescriptions found.</p>
            ) : (
              <table className="prescriptions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Medicines</th>
                    <th>Status</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.date}</td>
                      <td>{p.doctor}</td>
                      <td>{p.medicines}</td>
                      <td>{p.status}</td>
                      <td>
                        <button
                            className="download-btn"
                            onClick={() =>
                                downloadPDF("Prescription", {
                                Date: p.date,
                                Doctor: p.doctor,
                                Medicines: p.medicines,
                                Status: p.status,
                                })
                            }
                            >
                            Download
                            </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="auth-container">
            <h2>Profile</h2>

            {editProfile ? (
              <form onSubmit={handleProfileSave}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    value={patientInfo.address}
                    onChange={(e) => setPatientInfo({ ...patientInfo, address: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Contact:
                  <input
                    type="text"
                    value={patientInfo.contact}
                    onChange={(e) => setPatientInfo({ ...patientInfo, contact: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Blood Type:
                  <input
                    type="text"
                    value={patientInfo.bloodType}
                    onChange={(e) => setPatientInfo({ ...patientInfo, bloodType: e.target.value })}
                  />
                </label>
                <label>
                  Health Issues:
                  <textarea
                    value={patientInfo.healthIssues}
                    onChange={(e) => setPatientInfo({ ...patientInfo, healthIssues: e.target.value })}
                  />
                </label>
                <button type="submit" className="book-btn">Save Changes</button>
                <button type="button" className="logout-btn" onClick={() => setEditProfile(false)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p><strong>Name:</strong> {patientInfo.name}</p>
                <p><strong>Age:</strong> {patientInfo.age}</p>
                <p><strong>Address:</strong> {patientInfo.address}</p>
                <p><strong>Contact:</strong> {patientInfo.contact}</p>
                <p><strong>Email:</strong> {patientInfo.email}</p>
                <p><strong>Blood Type:</strong> {patientInfo.bloodType}</p>
                <p><strong>Health Issues:</strong> {patientInfo.healthIssues}</p>
                <button className="book-btn" onClick={() => setEditProfile(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;