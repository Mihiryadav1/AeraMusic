import React, { useEffect } from "react";
import axios from "axios";
const WeatherStats = () => {
  const fetchCurrentWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        const weatherData = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
        );
        console.log(weatherData.data, "weatherData");

        latText.innerText = lat.toFixed(2);
        longText.innerText = long.toFixed(2);
      });
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      console.log("");
    }
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
            <img src="./sun.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">23dC</p>
            <p className="text-lg">Weather</p>
            <p className="text-sm mutedGreen font-semibold">Status</p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./temperature.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">23dC</p>
            <p className="text-lg">Weather</p>
            <p className="text-sm mutedGreen font-semibold">Status</p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./wind.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">23dC</p>
            <p className="text-lg">Weather</p>
            <p className="text-sm mutedGreen font-semibold">Status</p>
          </div>
        </div>
        <div className="flex-1 secondary flex gap-3 secondary px-4 py-6 rounded">
          <div className="">
            <img src="./humidity.svg" alt="" width={70} />
          </div>
          <div className="statContent">
            <p className="text-2xl">23dC</p>
            <p className="text-lg">Weather</p>
            <p className="text-sm mutedGreen font-semibold">Status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;
