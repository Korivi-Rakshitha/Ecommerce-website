import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press-releases">Press Releases</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/help-center">Help Center</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/track-orders">Track Orders</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/return-policy">Return Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 zen.store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
