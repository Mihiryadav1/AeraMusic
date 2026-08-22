import { useEffect, useState } from "react";
import axios from "axios";
const WeatherStats = () => {
  const [weather, setWeather] = useState({
    humidity: null,
    wind: null,
    temperature: null,
    weather: null,
  });
  const fetchCurrentWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`,
        );
        const data = weatherData.data.current;
        setWeather({
          humidity: data.relative_humidity_2m,
          temperature: data.temperature_2m,
          weather: data.weather_code,
          wind: data.wind_speed_10m,
        });
      });
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      console.log("");
    }
  };
  const getWeatherText = (code) => {
    if (code === 0 || code === 1) {
      return "Clear";
    }

    if (code === 2 || code === 3 || (code >= 45 && code <= 48)) {
      return "Cloudy";
    }

    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      (code >= 95 && code <= 99)
    ) {
      return "Rain";
    }

    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return "Snow";
    }

    return "Cloudy";
  };
  useEffect(() => {
    fetchCurrentWeather();
  }, []);
  return (
    <div className="w-full text-white">
      <div className="mb-4">
        <p className="text-white text-2xl font-extrabold inline-block mb-1">
          Your Environment
        </p>
        <p>Real-time insights to help you stay in flow</p>
      </div>
      <div className="statsContainer flex w-[60%] py-2 gap-4">
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6  rounded">
          <div className="">
            <img src="./temperature.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">{weather.temperature}&deg;C</p>
            <p className="text-lg">Temperature</p>
            <p
              className={`text-sm ${weather.temperature < 32 ? "mutedGreen" : "text-red-400"} font-semibold`}
            >
              {weather.temperature < 32 ? "Good" : "Bad"}
            </p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./sun.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">{weather.weather}</p>
            <p className="text-lg">Weather</p>
            <p className="text-sm mutedGreen font-semibold">
              {getWeatherText(weather.weather)}
            </p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./wind.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">{weather.wind} Km/h</p>

            <p className="text-lg">Wind Speed</p>

            <p className="text-sm mutedGreen font-semibold">
              {weather.wind < 10
                ? "Calm"
                : weather.wind < 20
                  ? "Breezy"
                  : weather.wind < 40
                    ? "Windy"
                    : "Very Windy"}
            </p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./humidity.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">{weather.humidity}%</p>

            <p className="text-lg">Humidity</p>

            <p className="text-sm mutedGreen font-semibold">
              {weather.humidity < 30
                ? "Dry"
                : weather.humidity < 60
                  ? "Comfortable"
                  : weather.humidity < 80
                    ? "Humid"
                    : "Very Humid"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;
