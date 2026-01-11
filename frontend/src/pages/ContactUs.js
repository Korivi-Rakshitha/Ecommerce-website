import React, { useState } from 'react';
import '../styles/ContentPages.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you. Get in touch with us today!</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <h4>Email</h4>
              <p>support@ecommerce.com</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+91-1800-123-4567</p>
            </div>
            <div className="info-item">
              <h4>Address</h4>
              <p>123 Business Street, Tech City, India - 123456</p>
            </div>
            <div className="info-item">
              <h4>Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            {submitted && <div className="success-message">Thank you! We'll be in touch soon.</div>}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
