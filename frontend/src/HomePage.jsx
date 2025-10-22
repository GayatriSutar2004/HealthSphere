import React from 'react';
import './App.css';

const HomePage = ({ images, currentIndex }) => {
  return (
    <div className="home-section">
      {/* Hero Carousel */}
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 1s ease-in-out'
          }}
        >
          {images.map((img, index) => (
            <div className="carousel-slide" key={index}>
              <img src={img} alt={`Hospital ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Text */}
      <div className="home-text">
        <h1>Welcome to HealthSphere Hospital</h1>
        <p>
          HealthSphere is a next-generation digital hospital platform that connects
          patients, doctors, and administrators seamlessly. We aim to revolutionize
          healthcare with smart records, telemedicine, and efficient care delivery.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
