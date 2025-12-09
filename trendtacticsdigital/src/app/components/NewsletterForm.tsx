"use client";

import React from "react";

const NewsletterForm = () => (
  <form
    className="flex gap-2 newsletter-form glassmorphism shadow-lg animate-fade-in"
    onSubmit={e => {
      e.preventDefault();
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit', {
          event_category: 'Form',
          event_label: 'Newsletter Form',
          page_location: window.location.pathname
        });
      }
      alert("Thank you! You've been subscribed to our updates.");
    }}
  >
    <input
      type="email"
      placeholder="Enter your email"
      required
      className="flex-1 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
    />
    <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold button-primary animate-scale-in">
      Subscribe
    </button>
  </form>
);

export default NewsletterForm; 