import React, { useState } from 'react';
import '../styles/ContentPages.css';

const HelpCenter = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the Orders page in your account. Click on any order to see its current status and tracking information.'
    },
    {
      id: 2,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. If you\'re not satisfied with your purchase, simply initiate a return from your Orders page.'
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping options are available for faster delivery.'
    },
    {
      id: 4,
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship to most countries in Asia. International shipping fees apply based on destination.'
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, net banking, and digital wallets for payment.'
    },
    {
      id: 6,
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email address.'
    }
  ];

  return (
    <div className="content-page">
      <div className="content-container">
        <h1>Help Center</h1>
        <p>Find answers to common questions and get the support you need.</p>
        
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              >
                {faq.question}
                <span className="faq-icon">{expandedFaq === faq.id ? '−' : '+'}</span>
              </button>
              {expandedFaq === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
