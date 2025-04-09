import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly BASE_URL = 'https://api.tomorrow.io/v4/weather';

  async getWeather(location: string) {
    try {
      const url = `${this.BASE_URL}/forecast?location=${encodeURIComponent(location)}&apikey=${process.env.API_KEY}`;

      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }

  async getCurrentWeather(location: string) {
    try {
      const url = `${this.BASE_URL}/realtime?location=${encodeURIComponent(location)}&apikey=${process.env.API_KEY}`;

      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching current weather data: ${error.message}`);
    }
  }
}
