import React from 'react';
import '../styles/ContentPages.css';

const AboutUs = () => {
  return (
    <div className="content-page">
      <div className="content-container">
        <h1>About Us</h1>
        <p>Welcome to our e-commerce platform. We are dedicated to providing the best shopping experience to our customers.</p>
        
        <h2>Our Mission</h2>
        <p>Our mission is to make shopping easy, convenient, and affordable for everyone. We strive to offer a wide variety of high-quality products at competitive prices.</p>
        
        <h2>Our Vision</h2>
        <p>To become the most trusted and customer-friendly e-commerce platform, delivering excellence in service and quality.</p>
        
        <h2>Why Choose Us?</h2>
        <ul className="benefits-list">
          <li>Wide selection of products</li>
          <li>Competitive pricing</li>
          <li>Fast and reliable delivery</li>
          <li>24/7 customer support</li>
          <li>Secure payment options</li>
          <li>Easy returns and exchanges</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
