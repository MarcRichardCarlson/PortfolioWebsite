"use client";

import React, { useState, useEffect } from "react";
import ContactButton from "./ContactButton";
import Popup from '../ProjectSection/PopUp';

const ContactSection: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); 
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    // Fetch the CSRF token from your backend and set it
    fetch('/api/csrf-token')
      .then(response => response.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sanitizeInput = (input: string) => {
    const sanitizedInput = input.replace(/[<>]/g, "");
    return sanitizedInput;
  };

  const resetFormFields = () => {
    setName("");
    setLastName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);

    const sanitizedData = {
      name: sanitizeInput(name),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify(sanitizedData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      resetFormFields();
      setShowPopup(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });    
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-8 p-4 md:p-8 shadow-md">
      <h2 className="text-5xl font-bold">Contact
        <span className="font-2xl text-indigo-700">.</span>
      </h2>
      <span className="h-px w-full bg-indigo-700"></span>
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-800 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(sanitizeInput(e.target.value))}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-gray-800 font-semibold">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(sanitizeInput(e.target.value))}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-800 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                className={`border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEmailValid ? 'border-red-500' : ''}`}
                required
              />
              {!isEmailValid && <span className="text-red-500 text-sm">Invalid email format</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-gray-800 font-semibold">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(sanitizeInput(e.target.value))}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-gray-800 font-semibold">Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(sanitizeInput(e.target.value))}
              className="max-h-64 min-h-32 border rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <ContactButton onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))} />
          </div>
        </form>
      </div>
      {showPopup && (
        <Popup
          message="Message sent!"
          onClose={closePopup}
        />
      )}
    </section>
  );
};

export default ContactSection;