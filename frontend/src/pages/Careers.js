import React from 'react';
import '../styles/ContentPages.css';

const Careers = () => {
  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Careers</h1>
        <p>Join our growing team and be part of a company that's revolutionizing e-commerce!</p>
        
        <h2>Current Openings</h2>
        <div className="job-listings">
          <div className="job-card">
            <h3>Full Stack Developer</h3>
            <p className="location">Location: Remote</p>
            <p>We're looking for experienced developers to join our platform development team. You'll work with React, Node.js, and MongoDB.</p>
          </div>
          
          <div className="job-card">
            <h3>Customer Service Representative</h3>
            <p className="location">Location: On-site</p>
            <p>Help our customers with their inquiries and ensure they have the best experience with our platform.</p>
          </div>
          
          <div className="job-card">
            <h3>Marketing Manager</h3>
            <p className="location">Location: Remote</p>
            <p>Lead our marketing initiatives and help grow our brand presence across digital platforms.</p>
          </div>
        </div>
        
        <h2>Why Work With Us?</h2>
        <ul className="benefits-list">
          <li>Competitive salary and benefits</li>
          <li>Flexible working arrangements</li>
          <li>Professional development opportunities</li>
          <li>Collaborative work environment</li>
          <li>Health and wellness programs</li>
        </ul>
      </div>
    </div>
  );
};

export default Careers;
