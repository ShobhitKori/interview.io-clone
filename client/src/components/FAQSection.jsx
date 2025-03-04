import React, { useState } from 'react';
import { Plus, Minus, Phone } from 'lucide-react';

const faqs = [
  {
    question: "How do I schedule an interview?",
    answer: "Go to intervue.io. Select the profile and rounds suitable to your candidate evaluation requirements. Add candidate and company details and click 'Schedule Interview'."
  },
  {
    question: "Will I be charged per interview?",
    answer: "For on-demand interviews, you will get paid credits to use per month. For Live Platform, we have monthly subscription packages."
  },
  {
    question: "Can I get a trial for On-demand interviews?",
    answer: "Yes! Reach out to our sales team to avail trial credits."
  },
  {
    question: "How is Intervue's Platform different than zoom, google meets and teams?",
    answer: "On Intervue, you get a coding environment, high quality video calling, whiteboarding, question bank, live AI supported feedback & notes all on a single unified interface that makes conducting tech interviews a breeze."
  },
  {
    question: "Do Interviewers provide detailed feedback?",
    answer: "Yes. Our reports follow highest industry standards and have been applauded by our customers for being extremely useful in decision making."
  },
  {
    question: "Can I add team members?",
    answer: "Intervue thrives with multiple team members. You can collaborate on interviews, assignments, question banks and outcomes with your team mates. Give it a try."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">FAQs</h2>
      <p className="text-gray-600 mb-8">
        We understand that outsourcing your tech interviews requires a lot of trust. Here are frequently asked questions to clear all your doubts.
      </p>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left font-semibold text-lg"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <Minus className="flex-shrink-0 ml-2" />
              ) : (
                <Plus className="flex-shrink-0 ml-2" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <h3 className="font-semibold text-xl mb-2">Still have doubts?</h3>
        <a href="#" className="text-blue-600 flex items-center">
          <Phone className="mr-2" />
          Talk to our representative
        </a>
      </div>
    </div>
  );
};

export default FAQSection;