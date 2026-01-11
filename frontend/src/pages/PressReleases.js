import React from 'react';
import '../styles/ContentPages.css';

const PressReleases = () => {
  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Press Releases</h1>
        <p>Stay updated with the latest news and announcements from our company.</p>
        
        <div className="press-releases">
          <div className="press-card">
            <h3>New Product Categories Launched</h3>
            <p className="date">January 10, 2026</p>
            <p>We're thrilled to announce the launch of new product categories including electronics, fashion, and home & kitchen items. This expansion reflects our commitment to serving our customers better.</p>
          </div>
          
          <div className="press-card">
            <h3>Mobile App Now Available</h3>
            <p className="date">December 15, 2025</p>
            <p>Our mobile app is now available on iOS and Android. Download it today to enjoy exclusive mobile-only deals and faster checkout experience.</p>
          </div>
          
          <div className="press-card">
            <h3>Company Hits 1 Million Users Milestone</h3>
            <p className="date">November 20, 2025</p>
            <p>We're proud to announce that our platform has reached 1 million active users. Thank you for your continued support!</p>
          </div>
          
          <div className="press-card">
            <h3>Launch of Loyalty Rewards Program</h3>
            <p className="date">October 5, 2025</p>
            <p>Introducing our new loyalty rewards program! Earn points on every purchase and redeem them for discounts and exclusive offers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressReleases;
