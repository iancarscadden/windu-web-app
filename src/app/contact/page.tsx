'use client';

import { useState } from 'react';
import Background from "../../components/Background";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Background>
      <div className="min-h-screen">
        <nav className="px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-white/30 dark:bg-black/20 sticky top-0 z-10">
          <div className="font-bold text-xl">Windu</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link href="/background-demo" className="hover:text-blue-600 transition-colors font-medium">Demo</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">Contact</Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-lg leading-relaxed mb-6">
                  We'd love to hear from you. Whether you have a question about our services,
                  pricing, or just want to learn more about how Windu can help your business,
                  we're here to help.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-blue-600">contact@windu.ai</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p>123 AI Street<br />Innovation District<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Background>
  );
} 