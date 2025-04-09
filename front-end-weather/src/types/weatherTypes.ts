type Location = {
    lat: number;
    lon: number;
    name: string;
    type: string;
};

export type WeatherValues = {
    cloudCoverAvg: number;
    humidityAvg: number;
    precipitationProbabilityAvg: number;
    pressureSeaLevelAvg: number;
    rainAccumulationAvg: number;
    rainIntensityAvg: number;
    snowAccumulationAvg: number;
    snowIntensityAvg: number;
    sunriseTime: string;
    sunsetTime: string;
    temperatureApparentAvg: number;
    temperatureAvg: number;
    uvHealthConcernAvg: number;
    uvIndexAvg: number;
    visibilityAvg: number;
    weatherCodeMax: number;
    weatherCodeMin: number;
    windSpeedAvg: number;
    temperatureMin: number;
    temperatureMax: number;
    weatherCode: number;
};

type TimeEntry = {
    time: string;
    values: WeatherValues;
};

type Timelines = {
    daily: TimeEntry[];
    hourly: TimeEntry[];
};

export type WeatherAPIResponse = {
    location: Location;
    timelines: Timelines;
};