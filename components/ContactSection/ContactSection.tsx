import React, { useState, useEffect } from "react";
import Image from "next/image";
import Popup from "../PopUp";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import ContactImage from "../../public/images/train.png";
import RevealOnScroll from "../RevealOnScroll";
import { motion } from "framer-motion";
import CheckIcon from "../../public/icons/BxCheck.svg";

const ContactSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<"success" | "fail">("success");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToNewsletter, setAgreeToNewsletter] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const sanitizeInput = (input: string) => input.replace(/[<>]/g, "");
  const resetFormFields = () => {
    setName("");
    setEmail("");
    setMessage("");
    setAgreeToNewsletter(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);
    setIsSubmitting(true);

    try {
      const sanitizedData = {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        message: sanitizeInput(message),
        agreeToNewsletter,
      };

      // Save email to the newsletter list if agreed
      if (agreeToNewsletter) {
        const newsletterResponse = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sanitizedData.email }),
        });

        if (!newsletterResponse.ok) {
          throw new Error("Failed to save email to newsletter.");
        }
      }

      // Send contact form data
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) throw new Error("Failed to send contact form.");

      const data = await response.json();
      console.log("Success:", data);

      resetFormFields();
      setPopupType("success");
      setShowPopup(true);
    } catch (error) {
      console.error("Error:", error);
      setPopupType("fail");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 md:gap-8 w-full h-[600px] px-4 sm:px-6 md:px-8 text-black dark:text-white h-full pb-4 md:pb-8">
      <section className="flex flex-col gap-4 justify-between items-start shadow-custom-shadow bg-white dark:bg-dark-grey p-6 md:p-8 rounded-xl z-[999] order-1 xl:order-2">
        <RevealOnScroll direction="bottom" duration={0.2} delay={0.2}>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-2xl font-bold text-black dark:text-white font-montserrat">
              {t("contact-header")}
              <span className="font-2xl">.</span>
            </h2>
            <span className="text-lg text-white-grey font-montserrat">
              {t("contact-text")}
            </span>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6 text-black dark:text-white"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <RevealOnScroll direction="bottom" duration={0.4} delay={0.2}>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(sanitizeInput(e.target.value))}
                  placeholder={t("contact-name")}
                  className="rounded-lg border border-grey-300 dark:border-none bg-light-grey dark:bg-input-black px-4 py-3 text-sm md:text-base w-full"
                  required
                />
              </RevealOnScroll>

              <RevealOnScroll direction="bottom" duration={0.4} delay={0.4}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                  placeholder={t("contact-email")}
                  className={`rounded-lg border border-grey-300 dark:border-none bg-light-grey dark:bg-input-black px-4 py-3 text-sm md:text-base w-full ${!isEmailValid ? "border-red-500" : ""
                    }`}
                  required
                />
                {!isEmailValid && (
                  <span className="text-red-500 text-sm">
                    {t("contact-error")}
                  </span>
                )}
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="bottom" duration={0.4} delay={0.6}>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(sanitizeInput(e.target.value))}
                placeholder={t("contact-message")}
                className="rounded-xl border border-grey-300 dark:border-none bg-light-grey dark:bg-input-black max-h-64 min-h-32 px-4 py-3 block w-full text-sm md:text-base"
                rows={5}
                required
              ></textarea>
            </RevealOnScroll>

            <RevealOnScroll direction="bottom" duration={0.4} delay={0.8}>
              <div className="flex items-center justify-start gap-4">
                <div className="relative w-8 h-8">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={agreeToNewsletter}
                    onChange={(e) => setAgreeToNewsletter(e.target.checked)}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div
                    className={`w-8 h-8 rounded-lg border ${agreeToNewsletter
                      ? "bg-true-blue border-transparent"
                      : "bg-light-grey border-gray-400"
                      } flex items-center justify-center`}
                  >
                    {agreeToNewsletter && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={CheckIcon}
                          alt="Checkmark"
                          width={24}
                          height={24}
                          className="h-10 w-10"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="newsletter"
                  className="text-base md:text-lg cursor-pointer"
                >
                  {t("contact-agree-newsletter")}
                </label>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" duration={0.4} delay={1}>
              <div className="flex justify-end">
                <ResponsiveButton
                  size="xl"
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t("contact-button")}
                </ResponsiveButton>
              </div>
            </RevealOnScroll>
          </form>
        </div>

        {showPopup && (
          <Popup
            message={
              popupType === "success"
                ? t("contact-message-sent")
                : t("contact-error-message")
            }
            onClose={closePopup}
            type={popupType}
          />
        )}
      </section>

      <Image
        src={ContactImage}
        alt="Description"
        width={500}
        height={700}
        className="max-h-[700px] h-[400px] md:h-[600px] lg:h-[500px] xl:h-[700px] w-full object-cover rounded-xl shadow-custom-shadow order-2 xl:order-1"
        unoptimized={true}
      />
    </div>
  );
};

export default ContactSection;
