import { useState, useEffect } from 'react';
import { getWeather } from '../../services/WeatherComponent'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherComponent = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city);
        setWeather(data);
      } catch (error) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-white-grey font-semibold text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl">
      <p>{weather ? Math.round(weather.main.temp) : ''}°C</p>
    </div>
  );
};

export default WeatherComponent;
