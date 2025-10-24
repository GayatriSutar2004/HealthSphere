import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const appointments = [
    { id: 1, patient: "John Doe", date: "2025-10-25", time: "10:00 AM", status: "Upcoming" },
    { id: 2, patient: "Jane Smith", date: "2025-10-26", time: "2:00 PM", status: "Completed" },
    { id: 3, patient: "Sam Wilson", date: "2025-10-27", time: "11:30 AM", status: "Upcoming" },
  ];

  const videoCalls = [
  { id: 1, patient: "John Doe", date: "2025-10-22", time: "10:00 AM", duration: "30 min", status: "Completed" },
  { id: 2, patient: "Jane Smith", date: "2025-10-23", time: "2:00 PM", duration: "45 min", status: "Missed" },
  { id: 3, patient: "Sam Wilson", date: "2025-10-24", time: "11:30 AM", duration: "25 min", status: "Completed" },
];

  const prescriptions = [
    { id: 1, patient: "John Doe", medicine: "Paracetamol (500mg)", dosage: "2/day for 5 days" },
    { id: 2, patient: "Jane Smith", medicine: "Amoxicillin (250mg)", dosage: "1/day for 7 days" },
  ];

  const patients = [
    { id: 1, name: "John Doe", age: 30, condition: "Flu" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Infection" },
    { id: 3, name: "Sam Wilson", age: 45, condition: "Checkup" },
  ];

  const handleDownload = (prescription) => {
    if (typeof jsPDF === "undefined") {
      console.error("jsPDF library is not loaded globally.");
      return;
    }
    const doc = new jsPDF();
    doc.text(`Prescription for ${prescription.patient}`, 10, 10);
    doc.text(`Medicine: ${prescription.medicine}`, 10, 20);
    doc.text(`Dosage: ${prescription.dosage}`, 10, 30);
    doc.save(`${prescription.patient}_prescription.pdf`);
  };

  const getStatusClass = (status) => {
  switch (status) {
    case "Upcoming":
      return "status-upcoming";
    case "Completed":
      return "status-completed";
    case "Missed":
      return "status-missed";
    default:
      return "status-default";
  }
};


  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="content">
            <h2 className="heading">Doctor Dashboard Overview</h2>
            <p className="subtext">Welcome back, <strong>Dr. Patel</strong> 👋</p>

            <div className="cards">
              <div className="card card-blue">
                <p>Upcoming Appointments</p>
                <h3>{appointments.filter(a => a.status === "Upcoming").length}</h3>
              </div>
              <div className="card card-green">
                <p>Total Patients</p>
                <h3>{patients.length}</h3>
              </div>
              <div className="card card-yellow">
                <p>Prescriptions Written</p>
                <h3>{prescriptions.length}</h3>
              </div>
            </div>
          </div>
        );

      case "appointments":
        return (
          <div className="content">
            <h2 className="heading">Appointments</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.patient}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "prescriptions":
        return (
          <div className="content">
            <h2 className="heading">Prescriptions</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td>{p.patient}</td>
                    <td>{p.medicine}</td>
                    <td>{p.dosage}</td>
                    <td>
                      <button className="btn-download" onClick={() => handleDownload(p)}>
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "records":
        return (
          <div className="content">
            <h2 className="heading">Patient Records</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            );


     case "video-calls":
             const videoColumns = [
        { header: "Patient", accessor: "patient" },
        { header: "Date", accessor: "date" },
        { header: "Time", accessor: "time" },
        { header: "Duration", accessor: "duration" },
        { header: "Status", cell: (item) => (
            <span className={getStatusClass(item.status)}>
            {item.status}
            </span>
        )
        },
    ];
    return (
        <div className="content">
        <h2 className="heading">Video Call History</h2>
        <table className="data-table">
            <thead>
            <tr>
                {videoColumns.map((col, idx) => <th key={idx}>{col.header}</th>)}
            </tr>
            </thead>
            <tbody>
            {videoCalls.map((call) => (
                <tr key={call.id}>
                {videoColumns.map((col, idx) => (
                    <td key={idx}>
                    {col.cell ? col.cell(call) : call[col.accessor]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );

      case "profile":
        return (
          <div className="content">
            <h2 className="heading">Doctor Profile</h2>
            <div className="profile-card">
              <p><strong>Name:</strong> Dr. Patel</p>
              <p><strong>Email:</strong> dr.patel@healthsphere.com</p>
              <p><strong>Specialization:</strong> General Medicine</p>
              <p><strong>NPI:</strong> 9876543210</p>
            </div>
          </div>
        );

      default:
        return <div className="content">Error..</div>;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">HealthSphere</h2>
        {["dashboard", "appointments", "prescriptions", "records","video-Calls", "profile"].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`nav-btn ${activeTab === key ? "active" : ""}`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
        <div className="sidebar-footer">
          <button className="btn-emergency">Emergency Call</button>
          <button className="btn-logout">Logout</button>
        </div>
      </aside>

      <main className="main">{renderContent()}</main>
    </div>
  );
};

export default DoctorDashboard;
