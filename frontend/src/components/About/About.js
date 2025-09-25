import React from 'react';
import './About.css';
import Navbar from "../Navbar/Navbar";

const About = () => {
  return (
    <div className="about-container">
        {/* <Navbar /> */}
      <div className="about-content">
        <h1>About Us</h1>
        <p className="about-description">
          Welcome to our e-commerce platform! We are dedicated to providing the best shopping experience
          with a wide range of high-quality products at competitive prices.
        </p>
        
        <div className="about-features">
          <div className="feature">
            <i className="fas fa-shipping-fast"></i>
            <h3>Fast Shipping</h3>
            <p>Quick and reliable delivery to your doorstep</p>
          </div>
          
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Payments</h3>
            <p>100% secure payment processing</p>
          </div>
          
          <div className="feature">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Dedicated customer service team</p>
          </div>
        </div>
        
        <div className="about-team">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar">JD</div>
              <h4>John Doe</h4>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">JS</div>
              <h4>Jane Smith</h4>
              <p>Head of Operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
