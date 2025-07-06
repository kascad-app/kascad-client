import { WeatherCondition } from "@kascad-app/shared-types";

export const getWeatherLabel = (condition: WeatherCondition): string => {
  const weatherLabels: Record<WeatherCondition, string> = {
    [WeatherCondition.SUNNY]: "Ensoleillé",
    [WeatherCondition.PARTLY_CLOUDY]: "Partiellement nuageux",
    [WeatherCondition.CLOUDY]: "Nuageux",
    [WeatherCondition.OVERCAST]: "Couvert",
    [WeatherCondition.LIGHT_RAIN]: "Pluie légère",
    [WeatherCondition.MODERATE_RAIN]: "Pluie modérée",
    [WeatherCondition.HEAVY_RAIN]: "Pluie forte",
    [WeatherCondition.THUNDERSTORM]: "Orage",
    [WeatherCondition.SNOW]: "Neige",
    [WeatherCondition.BLIZZARD]: "Blizzard",
    [WeatherCondition.SLEET]: "Neige fondue",
    [WeatherCondition.HAIL]: "Grêle",
    [WeatherCondition.FOG]: "Brouillard",
    [WeatherCondition.MIST]: "Brume",
    [WeatherCondition.WINDY]: "Venteux",
    [WeatherCondition.STRONG_WIND]: "Vent fort",
    [WeatherCondition.GALE]: "Tempête",
    [WeatherCondition.HURRICANE]: "Ouragan",
    [WeatherCondition.TORNADO]: "Tornade",
    [WeatherCondition.HOT]: "Chaud",
    [WeatherCondition.COLD]: "Froid",
    [WeatherCondition.FREEZING]: "Gel",
    [WeatherCondition.DRY]: "Sec",
    [WeatherCondition.HUMID]: "Humide",
    [WeatherCondition.DUSTY]: "Poussiéreux",
    [WeatherCondition.SANDSTORM]: "Tempête de sable",
    [WeatherCondition.CLEAR_NIGHT]: "Nuit claire",
    [WeatherCondition.HEATWAVE]: "Canicule",
    [WeatherCondition.DROUGHT]: "Sécheresse",
    [WeatherCondition.TROPICAL_STORM]: "Tempête tropicale",
  };

  return weatherLabels[condition] || condition;
};

export const getAllWeatherConditions = (): Array<{
  value: WeatherCondition;
  label: string;
}> => {
  return Object.values(WeatherCondition).map((condition) => ({
    value: condition,
    label: getWeatherLabel(condition),
  }));
};

export const getWeatherIcon = (condition: WeatherCondition): string => {
  const weatherIcons: Record<WeatherCondition, string> = {
    [WeatherCondition.SUNNY]: "☀️",
    [WeatherCondition.PARTLY_CLOUDY]: "⛅",
    [WeatherCondition.CLOUDY]: "☁️",
    [WeatherCondition.OVERCAST]: "☁️",
    [WeatherCondition.LIGHT_RAIN]: "🌦️",
    [WeatherCondition.MODERATE_RAIN]: "🌧️",
    [WeatherCondition.HEAVY_RAIN]: "🌧️",
    [WeatherCondition.THUNDERSTORM]: "⛈️",
    [WeatherCondition.SNOW]: "❄️",
    [WeatherCondition.BLIZZARD]: "🌨️",
    [WeatherCondition.SLEET]: "🌨️",
    [WeatherCondition.HAIL]: "🧊",
    [WeatherCondition.FOG]: "🌫️",
    [WeatherCondition.MIST]: "🌫️",
    [WeatherCondition.WINDY]: "💨",
    [WeatherCondition.STRONG_WIND]: "💨",
    [WeatherCondition.GALE]: "🌪️",
    [WeatherCondition.HURRICANE]: "🌀",
    [WeatherCondition.TORNADO]: "🌪️",
    [WeatherCondition.HOT]: "🔥",
    [WeatherCondition.COLD]: "🥶",
    [WeatherCondition.FREEZING]: "🧊",
    [WeatherCondition.DRY]: "🏜️",
    [WeatherCondition.HUMID]: "💧",
    [WeatherCondition.DUSTY]: "🌪️",
    [WeatherCondition.SANDSTORM]: "🌪️",
    [WeatherCondition.CLEAR_NIGHT]: "🌙",
    [WeatherCondition.HEATWAVE]: "🔥",
    [WeatherCondition.DROUGHT]: "🏜️",
    [WeatherCondition.TROPICAL_STORM]: "🌀",
  };

  return weatherIcons[condition] || "🌤️";
};
