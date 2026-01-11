import React from 'react';
import '../styles/ContentPages.css';

const ReturnPolicy = () => {
  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Return Policy</h1>
        <p className="last-updated">Last Updated: January 10, 2026</p>
        
        <section className="policy-section">
          <h2>Our Return & Refund Policy</h2>
          <p>We want you to be completely satisfied with your purchase. If you're not satisfied with any item, we offer a hassle-free return process within 30 days of purchase.</p>
        </section>

        <section className="policy-section">
          <h2>1. Return Eligibility</h2>
          <p>Items are eligible for return if they meet the following conditions:</p>
          <ul className="benefits-list">
            <li>Returned within 30 days of purchase</li>
            <li>Item is in original, unused condition</li>
            <li>All original packaging and documentation included</li>
            <li>Item is not damaged due to misuse</li>
            <li>Receipt or proof of purchase is provided</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>2. Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="benefits-list">
            <li>Perishable goods and consumables</li>
            <li>Personalized or custom items</li>
            <li>Items with broken seals (for health/safety reasons)</li>
            <li>Digital products and downloads</li>
            <li>Items marked as final sale</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How to Initiate a Return</h2>
          <ol className="benefits-list">
            <li>Log in to your account and go to "My Orders"</li>
            <li>Select the order containing the item you want to return</li>
            <li>Click "Return Item" and provide a reason</li>
            <li>Print the prepaid shipping label</li>
            <li>Pack the item securely and drop it off</li>
          </ol>
        </section>

        <section className="policy-section">
          <h2>4. Refund Process</h2>
          <ul className="benefits-list">
            <li>Refunds are processed within 5-7 business days after we receive and inspect your return</li>
            <li>Refund will be credited to your original payment method</li>
            <li>Shipping costs are non-refundable unless the return is due to our error</li>
            <li>For defective items, we offer replacement or full refund</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Exchanges</h2>
          <p>If you'd like to exchange an item for a different size, color, or model, we can help! Simply initiate a return and place a new order for the item you want. We'll refund your original purchase once your return is received.</p>
        </section>

        <section className="policy-section">
          <h2>6. Damaged or Defective Items</h2>
          <p>If you receive a damaged or defective item, please contact us within 48 hours of delivery. We will arrange for a replacement or full refund without requiring you to ship the item back.</p>
        </section>

        <section className="policy-section">
          <h2>7. Contact Us</h2>
          <p>If you have any questions about our return policy, please contact our customer service team at returns@ecommerce.com or call 1800-123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
