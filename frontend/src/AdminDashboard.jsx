import React, { useState } from "react";
import "./App.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  // 🔹 Sample Data
  const doctors = [
    { id: 1, name: "Dr. Patel", specialization: "General Medicine", status: "Active" },
    { id: 2, name: "Dr. Singh", specialization: "Cardiology", status: "Inactive" },
  ];

  const patients = [
    { id: 1, name: "John Doe", age: 30, status: "Active" },
    { id: 2, name: "Jane Smith", age: 25, status: "Inactive" },
  ];

  const appointments = [
    { id: 1, doctor: "Dr. Patel", patient: "John Doe", date: "2025-10-25", status: "Upcoming" },
    { id: 2, doctor: "Dr. Singh", patient: "Jane Smith", date: "2025-10-26", status: "Completed" },
  ];

  const prescriptions = [
    { id: 1, doctor: "Dr. Patel", patient: "John Doe", medicine: "Paracetamol", dosage: "2/day" },
    { id: 2, doctor: "Dr. Singh", patient: "Jane Smith", medicine: "Amoxicillin", dosage: "1/day" },
  ];

  const videoCalls = [
    { id: 1, doctor: "Dr. Patel", patient: "John Doe", date: "2025-10-22", duration: "30 min", status: "Completed" },
    { id: 2, doctor: "Dr. Singh", patient: "Jane Smith", date: "2025-10-23", duration: "45 min", status: "Missed" },
  ];

  const notifications = [
    { id: 1, message: "New doctor registration pending approval", type: "Alert" },
    { id: 2, message: "System maintenance scheduled", type: "Info" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Active": return "status-active";
      case "Inactive": return "status-inactive";
      case "Upcoming": return "status-upcoming";
      case "Completed": return "status-completed";
      case "Missed": return "status-missed";
      default: return "status-default";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div>
            <h2>Doctors</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Specialization</th><th>Status</th></tr>
              </thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.specialization}</td>
                    <td><span className={getStatusClass(d.status)}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Patients</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Age</th><th>Status</th></tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td><span className={getStatusClass(p.status)}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "appointments":
        return (
          <div>
            <h2>All Appointments</h2>
            <table>
              <thead>
                <tr><th>Doctor</th><th>Patient</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td>{a.doctor}</td>
                    <td>{a.patient}</td>
                    <td>{a.date}</td>
                    <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "prescriptions":
        return (
          <div>
            <h2>Prescriptions</h2>
            <table>
              <thead>
                <tr><th>Doctor</th><th>Patient</th><th>Medicine</th><th>Dosage</th></tr>
              </thead>
              <tbody>
                {prescriptions.map(p => (
                  <tr key={p.id}>
                    <td>{p.doctor}</td>
                    <td>{p.patient}</td>
                    <td>{p.medicine}</td>
                    <td>{p.dosage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "video-calls":
        return (
          <div>
            <h2>Video Call History</h2>
            <table>
              <thead>
                <tr><th>Doctor</th><th>Patient</th><th>Date</th><th>Duration</th><th>Status</th></tr>
              </thead>
              <tbody>
                {videoCalls.map(c => (
                  <tr key={c.id}>
                    <td>{c.doctor}</td>
                    <td>{c.patient}</td>
                    <td>{c.date}</td>
                    <td>{c.duration}</td>
                    <td><span className={getStatusClass(c.status)}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "reports":
        return (
          <div>
            <h2>Reports & Analytics</h2>
            <p>Total Doctors: {doctors.length}</p>
            <p>Total Patients: {patients.length}</p>
            <p>Total Appointments: {appointments.length}</p>
            <p>Total Prescriptions: {prescriptions.length}</p>
            <p>Total Video Calls: {videoCalls.length}</p>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h2>Notifications</h2>
            <ul>
              {notifications.map(n => (
                <li key={n.id}><strong>{n.type}:</strong> {n.message}</li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "220px", padding: "20px", background: "#f4f4f4" }}>
        <h2>Admin Panel</h2>
        {["users","appointments","prescriptions","video-calls","reports","notifications"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ display: "block", margin: "10px 0", width: "100%" }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
