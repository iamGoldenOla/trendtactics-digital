import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  faqs: FAQItem[];
};

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className={`border rounded transition card-hover glassmorphism shadow-lg ${openIndex === idx ? "bg-blue-50 border-primary animate-fade-in" : "bg-white border-gray-200"}`}
        >
          <button
            className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-answer-${idx}`}
          >
            <span className="font-semibold">{faq.question}</span>
            <span className={`ml-2 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}>▼</span>
          </button>
          <div
            id={`faq-answer-${idx}`}
            className={`px-4 pb-3 text-gray-700 text-sm transition-all duration-300 ${openIndex === idx ? "block animate-slide-up" : "hidden"}`}
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQ; 