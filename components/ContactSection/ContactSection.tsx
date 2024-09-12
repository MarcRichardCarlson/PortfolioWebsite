import React, { useState } from "react";
import Popup from '../PopUp';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import { useSelectedPackages } from "./SelectedPackagesContext";

const ContactSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state to handle form submission
  const { selectedPackages, removePackage, resetPackages } = useSelectedPackages();

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
    resetPackages(); // Clear selected packages
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);
    setIsSubmitting(true); // Disable form submission

    const sanitizedData = {
      name: sanitizeInput(name),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      selectedPackages: selectedPackages, // Include selected packages in the data
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      resetFormFields();
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Re-enable form submission
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="relative w-full h-full md:min-h-screen flex flex-col items-center justify-center gap-8 p-4 md:p-8 shadow-md">
      <span className="absolute top-0 h-px w-full bg-indigo-700"></span>
      <h2 className="text-2xl md:text-5xl font-bold text-white-grey">{t("contact-header")}
        <span className="font-2xl text-indigo-700">.</span>
      </h2>
      <div className="flex flex-col gap-4 w-full md:w-2/3 bg-dark-grey rounded-xl p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(sanitizeInput(e.target.value))}
              placeholder={t("contact-name")}
              className="bg-black-soil rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 text-white-grey text-sm md:text-base "
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(sanitizeInput(e.target.value))}
              placeholder={t("contact-last-name")}
              className="bg-black-soil rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 text-white-grey text-sm md:text-base "
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(sanitizeInput(e.target.value))}
              placeholder={t("contact-email")}
              className={`bg-black-soil rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 text-white-grey text-sm md:text-base  ${!isEmailValid ? 'border-red-500' : ''}`}
              required
            />
            {!isEmailValid && <span className="text-red-500 text-sm">{t("contact-error")}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(sanitizeInput(e.target.value))}
              placeholder={t("contact-subject")}
              className="bg-black-soil rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 text-white-grey text-sm md:text-base "
              required
            />
          </div>

          </div>

          <div className="flex flex-col gap-2">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(sanitizeInput(e.target.value))}
              placeholder={t("contact-message")}
              className="bg-black-soil max-h-64 min-h-32 rounded-md py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white-grey text-sm md:text-base "
              rows={5}
              required
            ></textarea>
          </div>
          
          <div className="drop-shadow-md flex flex-col gap-1 md:gap-2 bg-black-soil p-2 md:p-4 rounded-md w-fit">
            <div className="flex flex-row gap-2 text-light-grey">
              <h3 className="text-light-grey font-semibold text-xs md:text-base">{t("contact-selected") + ' :'}</h3>
              <span className="text-xs md:text-base">{selectedPackages.length}</span>
            </div>
            <div className="w-full bg-indigo-500 h-px"></div>
            <ul className="list-disc list-inside flex flex-col gap-0 md:gap-2">
              {selectedPackages.map((pkg, index) => (
                <li key={index} className="flex flex-row gap-2 md:gap-4 items-center justify-left">
                  <span className="text-light-grey text-sm md:text-base">{pkg}</span>
                  <ResponsiveButton size="sm" variant="remove" onClick={() => removePackage(pkg)}>
                    {t('remove')}
                  </ResponsiveButton>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <ResponsiveButton size="xl" variant="send" type="submit" disabled={isSubmitting}>
              {t("contact-button")}
            </ResponsiveButton>
          </div>
        </form>
      </div>

      {showPopup && (
        <Popup
        message={t("contact-message-sent")}
        onClose={closePopup} 
        type={"success"}
        />
      )}
    </section>
  );
};

export default ContactSection;
