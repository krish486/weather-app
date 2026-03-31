const Weather = ({ weather, city, loading }) => {


    const now = new Date()

    const day = now.toLocaleDateString("en-US", { weekday: "long" })
    const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short"
    })

    return (
        <div className='h-[45%] w-full px-4 md:px-8'>

            <div className='w-full min-h-62.5 md:min-h-75 p-6 md:p-8 rounded-2xl 
      bg-[url("https://jooinn.com/images/blue-skies-2.jpg")] bg-cover bg-top 
      flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                        {loading ? `Loading...` : `Weather in ${city || 'your city'}`}
                    </h3>

                    <div className="flex gap-4 md:gap-6 items-end flex-wrap">

                        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-black">
                            {weather ? `${weather.temperature_2m}°` : '--'}
                        </h1>

                        <div className="flex flex-col">
                            <p className="text-xl md:text-3xl text-gray-800">
                                Cloudy
                            </p>
                            <p className="text-sm md:text-base text-gray-900">
                                {day}, {date}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="w-full md:w-auto p-4 md:p-5 bg-white/20 backdrop-blur-md rounded-2xl text-black flex flex-col gap-3">

                    <div className="flex justify-between gap-4">
                        <p>Wind</p>
                        <h4 className="font-semibold">
                            {weather ? `${weather.wind_speed_10m} km/h` : '--'}
                        </h4>
                    </div>

                    <div className="flex justify-between gap-4">
                        <p>Humidity</p>
                        <h4 className="font-semibold">
                            {weather ? `${weather.relative_humidity_2m}%` : '--'}
                        </h4>
                    </div>

                    <div className="flex justify-between gap-4">
                        <p>Rain</p>
                        <h4 className="font-semibold">
                            {weather ? `${weather.rain}%` : '--'}
                        </h4>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Weather;