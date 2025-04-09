import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Image,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import sunnyIcon from "../assets/sunny.png";
import moonIcon from "../assets/moon.png";
import cloudyIcon from "../assets/cloudy-icon.png";
import rainIcon from "../assets/rain-icon.png";
import lightRainIcon from "../assets/light-rain-icon.png";
import iceRainIcon from "../assets/ice-rain-icon.png";
import fogIcon from "../assets/fog-icon.png";
import granizoIcon from "../assets/granizo-icon.png";
import snowIcon from "../assets/snow-icon.png";
import stormIcon from "../assets/storm-icon.png";
import parcialmenteNubladoIcon from "../assets/parcialmente-nublado-icon.png";
import mostlyClear from "../assets/mostly-clear-icon.png";
import sunnyBg from "../assets/wallpaper-sunny.png";
import cloudyBg from "../assets/wallpaper-cloudy.png";
import nightBg from "../assets/night-clean-wallpaper.png";
import cloudyNightBg from "../assets/cloudy-night-wallpaper.png";
import rainbg from "../assets/rain-wallpaper.png";
import { getWeatherByCity } from "../api/weatherApi";
import { WeatherAPIResponse } from "../types/weatherTypes";
import { convertToLocalTime, getWeatherCondition } from "../utils/services";

const currentWeatherMock = {
  data: {
    values: {
      temperature: 72,
      weatherCode: 1100,
      windSpeed: 12,
      humidity: 50,
    },
  },
};

const weatherBackgrounds: Record<number, string> = {
  1100: sunnyBg, // Ensolarado
  1001: cloudyBg, // Nublado
  2000: cloudyNightBg, // Noite nublada
};

const weatherCodeToIcon: Record<number, string> = {
  1000: sunnyIcon,
  1001: cloudyIcon,
  1100: mostlyClear,
  1101: parcialmenteNubladoIcon,
  1102: parcialmenteNubladoIcon,
  1103: parcialmenteNubladoIcon,
  2100: fogIcon,
  2000: fogIcon,
  2101: fogIcon,
  2102: fogIcon,
  2103: fogIcon,
  4000: rainIcon,
  4001: rainIcon,
  4200: lightRainIcon,
  4201: rainIcon,
  5000: snowIcon,
  5001: snowIcon,
  5100: snowIcon,
  5101: snowIcon,
  6000: iceRainIcon,
  6001: iceRainIcon,
  6200: iceRainIcon,
  6201: iceRainIcon,
  7000: granizoIcon,
  7102: granizoIcon,
  7101: granizoIcon,
  8000: stormIcon,
};

export default function WeatherApp() {
  const [loading, setLoading] = React.useState(true);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [weather, setWeather] = useState<WeatherAPIResponse | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const dailyValues = weather?.timelines.daily[0]?.values || {};
  const sunrise = new Date(dailyValues.sunriseTime);
  const sunset = new Date(dailyValues.sunsetTime);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity("Taquara", "BR");
        setWeather(data);

        const weatherCode = data?.data?.values?.weatherCode || 1001;
        setBackgroundImage(weatherBackgrounds[weatherCode] || sunnyBg);
      } catch (error) {
        console.error("Erro ao carregar clima:", error);
      }
    };

    fetchWeather();
  }, []);

  // Simulando um efeito de carregamento
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  // Dados atuais e forecast
  const currentWeather = currentWeatherMock;

  const currentIcon =
    weatherCodeToIcon[
      weather?.timelines.daily[0].values.weatherCodeMax ?? 1001
    ];

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      backgroundPosition="center"
      color="white"
      minH="100vh"
      p={4}
    >
      {/* Clima Atual */}
      <VStack spacing={2} align="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">
          {weather?.location.name.split(",")[0]}
        </Text>
        <Text fontSize="7xl" fontWeight="bold">
          {Math.round(weather?.timelines.daily[0].values.temperatureAvg ?? 0)}°
        </Text>
        <Image src={currentIcon} alt="Weather Icon" boxSize="100px" />
        <Text fontSize="3xl">
          {getWeatherCondition(weather.timelines.daily[0].values)}
        </Text>
        <Text fontSize="md">
          Wind: {currentWeather.data.values.windSpeed} mph
        </Text>
        <Text fontSize="md">
          Humidity: {currentWeather.data.values.humidity}%
        </Text>
      </VStack>

      {/* Previsão Horária */}
      <Box mb={6}>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          Previsão Horária
        </Text>
        <Flex overflowX="scroll" pb={2}>
          {weather?.timelines.hourly.map((hour, index) => {
            const hourIcon =
              weatherCodeToIcon[hour.values.weatherCode] ||
              "https://via.placeholder.com/40?text=Icon";
            const hourTemp = Math.round(
              weather.timelines.hourly[index].values.temperature
            );
            const hourLabel = new Date(hour.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <VStack
                key={index}
                w="80px"
                minW="80px"
                align="center"
                bg="whiteAlpha.200"
                borderRadius="md"
                p={2}
                mr={2}
              >
                <Text fontSize="md">{hourLabel}</Text>
                <Image src={hourIcon} alt="Hourly Icon" boxSize="60px" />
                <Text fontSize="lg">{hourTemp}°</Text>
              </VStack>
            );
          })}
        </Flex>
      </Box>

      {/* Previsão Diária */}
      <Box>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          Previsão Diária
        </Text>
        <VStack spacing={2}>
          {weather?.timelines.daily.map((day, index) => {
            const dayIcon =
              weatherCodeToIcon[day.values.weatherCodeMax] ||
              "https://via.placeholder.com/40?text=Icon";
            const maxTemp = Math.round(day.values.temperatureMax);
            const minTemp = Math.round(day.values.temperatureMin);
            const dayLabel = new Date(day.time).toLocaleDateString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
            return (
              <HStack
                key={index}
                w="100%"
                bg="whiteAlpha.200"
                borderRadius="md"
                p={3}
                justify="space-between"
              >
                <Text flex="1" fontSize="md" fontWeight="semibold">
                  {dayLabel}
                </Text>
                <Image src={dayIcon} alt="Daily Icon" boxSize="40px" />
                <HStack>
                  <Text fontSize="md">{minTemp}°</Text>
                  <Text fontSize="md">/</Text>
                  <Text fontSize="md" fontWeight="bold">
                    {maxTemp}°
                  </Text>
                </HStack>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}
