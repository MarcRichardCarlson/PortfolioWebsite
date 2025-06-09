import React, { memo, useCallback } from 'react';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";

interface SpolaKnappProps {
  contactRef: React.RefObject<HTMLElement>;
}

const SpolaKnapp = memo(({ contactRef }: SpolaKnappProps) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const handleScrollToContact = useCallback(() => {
    if (contactRef && contactRef.current) {
      const headerOffset = 80;
      const elementPosition = contactRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [contactRef]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ResponsiveButton
        size="xl"
        variant="primary"
        onClick={handleScrollToContact}
        className="w-full max-w-xs"
      >
        {t("CTA")}
      </ResponsiveButton>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("scroll-hint")}
      </p>
    </div>
  );
});

SpolaKnapp.displayName = 'SpolaKnapp';

export default SpolaKnapp;
