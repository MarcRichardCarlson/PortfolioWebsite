import React, { memo, useEffect, useState, useCallback } from 'react';
import Image from "next/image";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const Weather = memo(() => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      const response = await fetch('/api/weather');
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Failed to load weather');
      console.error('Weather fetch error:', err);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [fetchWeather]);

  if (error) {
    return null;
  }

  if (!weather) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="w-6 h-6 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full" />
        <span>{t("loading")}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <Image
        src={weather.icon}
        alt={weather.condition}
        width={24}
        height={24}
        className="w-6 h-6"
        priority
      />
      <span>{weather.temperature}°C</span>
    </div>
  );
});

Weather.displayName = 'Weather';

export default Weather;
