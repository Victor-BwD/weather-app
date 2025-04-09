import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './app/modules/weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot(), WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
