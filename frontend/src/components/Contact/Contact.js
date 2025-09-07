import React, { useState } from 'react';
import './Contact.css';
import Navbar from "../Navbar/Navbar";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Form submitted:', formData);
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="contact-container">
        <Navbar />
      <div className="contact-content">
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p className="contact-description">
            Have questions or need assistance? Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Our Location</h3>
                <p>123 E-Commerce Street, Tech City, TC 12345</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email Us</h3>
                <p>support@klickks.com</p>
                <p>info@klickks.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"><FaFacebookF /> </i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"><CiTwitter /> </i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"><CiInstagram /> </i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"><CiLinkedin /> </i></a>
              <a href="#" className="social-link"><i className="fab fa-whatsapp"><FaWhatsapp /> </i></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a Message</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
