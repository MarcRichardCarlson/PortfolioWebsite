import React, { useState } from "react";
import Image from 'next/image';
import Popup from '../PopUp';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import ContactImage from "../../public/images/RuS@wIWo@n.png";
import RevealOnScroll from "../RevealOnScroll";

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
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 md:gap-8 w-full h-[600px] px-4 sm:px-6 md:px-8 text-black dark:text-white h-full pb-4 md:pb-8">

      <Image src={ContactImage} alt="Description" width={500} height={500} className="max-h-[600px] w-full object-cover rounded-3xl" unoptimized={true}/>

      <section className="flex flex-col gap-4 justify-between items-start shadow-custom-shadow bg-light-grey dark:bg-dark-grey p-6 md:p-8 rounded-3xl z-[10000]">

        <div className="flex flex-col gap-2">
          <RevealOnScroll direction="bottom" duration={0.2} delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-montserrat">{t("contact-header")}
              <span className="font-2xl">.</span>
            </h2>
            <span className="text-white-grey font-montserrat">{t("contact-text")}</span>
          </RevealOnScroll>
        </div>

        <div className="flex flex-col gap-4 w-full ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 text-black dark:text-white">
            <div className="flex flex-col gap-4 md:gap-6">

              <RevealOnScroll direction="bottom" duration={0.4} delay={0.2}>
                <div className="flex flex-col gap-2">

                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(sanitizeInput(e.target.value))}
                    placeholder={t("contact-name")}
                    className="rounded-lg bg-white dark:bg-input-black px-4 py-3 text-sm md:text-base "
                    required
                    />
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="bottom" duration={0.4} delay={0.4}>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                    placeholder={t("contact-email")}
                    className={`rounded-lg bg-white dark:bg-input-black px-4 py-3 text-sm md:text-base  ${!isEmailValid ? 'border-red-500' : ''}`}
                    required
                    />
                  {!isEmailValid && <span className="text-red-500 text-sm">{t("contact-error")}</span>}
                </div>
              </RevealOnScroll>

            </div>
            
            <RevealOnScroll direction="bottom" duration={0.4} delay={0.6}>
              <div className="flex flex-col gap-2">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(sanitizeInput(e.target.value))}
                  placeholder={t("contact-message")}
                  className="rounded-xl bg-white dark:bg-input-black max-h-64 min-h-32 px-4 py-3 block w-full text-sm md:text-base "
                  rows={5}
                  required
                  ></textarea>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" duration={0.4} delay={0.8}>
              <div className="flex justify-end">
                <ResponsiveButton size="xl" variant="secondary" type="submit" disabled={isSubmitting}>
                  {t("contact-button")}
                </ResponsiveButton>
              </div>
            </RevealOnScroll>

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
    </div>
  );
};

export default ContactSection;
