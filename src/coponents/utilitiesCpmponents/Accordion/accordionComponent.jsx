import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Accordion/Accordion.scss';

const AccordionComponent = () => {
  // Static FAQs list
  const staticFaqs = [
    {
      title: "What is your refund policy?",
      children: "We offer a full refund within 30 days of your purchase.",
    },
    {
      title: "How can I cancel my subscription?",
      children: "You can cancel your subscription anytime in your account settings.",
    },
    {
      title: "Do you offer a free trial?",
      children: "Yes, we offer a 7-day free trial for new users.",
    },
    {
      title: "How can I contact support?",
      children: "You can contact our support team via email at support@example.com.",
    },
    {
      title: "Is my payment information secure?",
      children: "Yes, we use encryption to keep your payment information safe.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {staticFaqs.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndex === index ? 'open' : ''}`}
        >
          <div
            className={`accordion-header ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="accordion-title">{item.title}</span>
            <div className={`accordion-toggle ${openIndex === index ? 'open' : ''}`}>
              {openIndex === index ? '-' : '+'}
            </div>
          </div>
          {openIndex === index && (
            <div className="accordion-content">
              {item.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Removed PropTypes as it is no longer needed
export default AccordionComponent;
