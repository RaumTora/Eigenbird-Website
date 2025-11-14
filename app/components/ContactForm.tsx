'use client'

import { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <label className="text-gray-400 text-sm tracking-widest block">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="w-full bg-transparent border-b border-gray-700 text-white text-lg pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-gray-400 text-sm tracking-widest block">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full bg-transparent border-b border-gray-700 text-white text-lg pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-gray-400 text-sm tracking-widest block">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          rows={4}
          className="w-full bg-transparent border-b border-gray-700 text-white text-lg pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
      >
        Send Message
      </button>
    </form>
  );
};