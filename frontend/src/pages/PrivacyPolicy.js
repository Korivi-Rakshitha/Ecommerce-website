import React from 'react';
import '../styles/ContentPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 10, 2026</p>
        
        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul className="benefits-list">
            <li>Name and email address</li>
            <li>Billing and shipping address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Account credentials</li>
          </ul>
          <h3>Non-Personal Information</h3>
          <ul className="benefits-list">
            <li>Browser type and language</li>
            <li>IP address</li>
            <li>Pages visited and time spent</li>
            <li>Cookies and tracking data</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <ul className="benefits-list">
            <li>Process and fulfill your orders</li>
            <li>Send promotional emails and updates</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraudulent transactions</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section className="policy-section">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="benefits-list">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@ecommerce.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
