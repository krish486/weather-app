import {
    RiSunLine,
    RiCloudLine,
    RiRainyLine
} from "@remixicon/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";




const Forecast = ({ cordinate }) => {
    const [data7, setData7] = useState(null);
    const [dataJSON, setDataJSON] = useState([])
    const [loading, setLoading] = useState(false)


    let getSevenDayForecast = async () => {
        try {
            setLoading(true)

            let res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cordinate.latitude}&longitude=${cordinate.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=GMT`)

            let arr1 = res.data.daily

            if (!arr1 || !arr1.time) {
                alert("⚠️ Forecast data unavailable")
                setLoading(false)
                return
            }

            let arr2 = arr1.time.map((date, idx) => ({
                day: idx === 0
                    ? "Today"
                    : new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
                temp: arr1.temperature_2m_max[idx],
                min: arr1.temperature_2m_min[idx],
                icon: getWeatherType(arr1.weather_code[idx]), // FIXED
                rain: `${arr1.rain_sum[idx]} mm`
            }))

            setDataJSON(arr2)

        } catch (err) {
            console.log(err)
            alert("⚠️ Failed to load forecast")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (cordinate) {
            getSevenDayForecast();
        }
    }, [cordinate])

    const getWeatherType = (code) => {
        if (code === 0) return "sun"
        if (code <= 3) return "cloud"
        if (code >= 51 && code <= 67) return "rain"
        if (code >= 95) return "storm"

        return "sun"
    }

    const data = [...dataJSON];

    const getIcon = (type) => {
        switch (type) {
            case "sun":
                return <RiSunLine className="text-yellow-500" size={28} />;
            case "cloud":
                return <RiCloudLine className="text-gray-500" size={28} />;
            case "rain":
                return <RiRainyLine className="text-blue-500" size={28} />;
            default:
                return <RiSunLine size={28} />;
        }
    };





    return (
        <div className="w-full px-4 md:px-8 py-6">

            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                        7-Day Forecast
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Expect scattered showers mid-week
                    </p>
                </div>

            </div>

            <div className="flex justify-between gap-3 sm:gap-4 overflow-x-auto p-2">

                {
                    loading ? (
                        <p className="text-center w-full">Loading forecast...</p>
                    ) : data.length === 0 ? (
                        <p className="text-center w-full">Search a city to see forecast</p>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className={`min-w-25 sm:min-w-30 md:min-w-35 shrink-0 
            rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between transition-all duration-300
            ${index === 0
                                    ? "bg-blue-700 text-white scale-105"
                                    : "bg-gray-100 text-gray-800 hover:scale-105"
                                }`}>
                                <p
                                    className="font-semibold text-sm sm:text-base">
                                    {item.day}
                                </p>

                                <div
                                    className="my-2">
                                    {getIcon(item.icon)}
                                </div>

                                <h3
                                    className="text-lg sm:text-xl md:text-2xl font-bold">
                                    {item.temp}°
                                </h3>

                                <p
                                    className="text-xs sm:text-sm opacity-70">
                                    {item.min}°
                                </p>

                                <p
                                    className="text-[10px] sm:text-xs mt-2">
                                    💧 {item.rain}
                                </p>
                            </div>
                        ))
                    )
                }

            </div>
        </div>
    );
};

export default Forecast;