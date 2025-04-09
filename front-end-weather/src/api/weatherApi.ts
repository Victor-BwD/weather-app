import apiClient from './axiosInstance';

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await apiClient.get(`/weather?location=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o clima:', error);
    throw error;
  }
};
