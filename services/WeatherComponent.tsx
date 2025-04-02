import axios from 'axios';

export const getWeather = async (city: string) => {
  try {
    const response = await axios.get('/api/weather', {
      params: {
        city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
