import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('location') location: string) {
    return this.weatherService.getWeather(location);
  }

  @Get('current')
  async getCurrentWeather(@Query('location') location: string) {
    return this.weatherService.getCurrentWeather(location);
  }
}
