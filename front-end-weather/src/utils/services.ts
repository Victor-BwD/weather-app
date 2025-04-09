import { WeatherValues } from "../types/weatherTypes";

export function getWeatherCondition(values: WeatherValues): string {
    const { cloudCoverAvg, precipitationProbabilityAvg, rainIntensityAvg, weatherCodeMax } = values;
    console.log("Código do tempo:", weatherCodeMax);
  
    if (weatherCodeMax === 1000) return "Ensolarado";
    if (weatherCodeMax === 1001) return "Nublado";
    if (weatherCodeMax === 1100) return "Parcialmente nublado";
    if (weatherCodeMax === 4200) return "Chuva moderada";
    if (weatherCodeMax === 4000) return "Chuva fraca";
    if (weatherCodeMax === 5001) return "Neve fraca";
  
    if (precipitationProbabilityAvg > 50 && rainIntensityAvg > 0) return "Chuvoso";
    if (cloudCoverAvg > 75) return "Nublado";
    if (cloudCoverAvg > 50) return "Predominantemente nublado";
    if (cloudCoverAvg > 25) return "Parcialmente nublado";
  
    return "Céu limpo";
}

export const convertToLocalTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
}

export function isNightTimeNow(sunrise: Date, sunset: Date): boolean {
    const now = new Date();
    return now < sunrise || now > sunset;
  }