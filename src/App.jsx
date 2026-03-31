import Navbar from './components/Navbar'
import Forecast from './components/Forecast'
import Weather from './components/Weather'
import axios from 'axios'
import { useEffect, useState } from 'react'


const App = () => {

  const [searchCity, setSearchCity] = useState(null)
  let [city, setCity] = useState("")

  let [cordinate, setCordinate] = useState(null)

  let [weather, setWeather] = useState(null)

  const [loading, setLoading] = useState(false)



  let getCord = async (city) => {
    try {
      let res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

      if (!res.data.results || res.data.results.length === 0) {
        alert("❌ City not found. Please enter a valid city.")
        setLoading(false)
        return
      }

      setCordinate({
        longitude: res.data.results[0].longitude,
        latitude: res.data.results[0].latitude
      })
      setSearchCity(res.data.results[0].name)

    } catch (err) {
      console.log(err)
      alert("⚠️ Something went wrong while fetching location")
      setLoading(false)
    }
  }

  let getweather = async ({ longitude, latitude }) => {
    try {
      let res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,rain,temperature_2m,weather_code,relative_humidity_2m`
      )

      setWeather(res.data.current)

    } catch (err) {
      console.log(err)
      alert("⚠️ Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  let handleCitySearch = () => {
    if (!city.trim()) {
      alert("⚠️ Please enter a city name")
      return
    }

    setLoading(true)
    getCord(city)
  }

  useEffect(() => {
    if (cordinate) {
      getweather(cordinate);
    }
  }, [cordinate]);


  return (
    <div className='h-screen w-screen flex flex-col items-center justify-start gap-8 '>
      <Navbar handleCitySearch={handleCitySearch} setCity={setCity} city={city} />
      <Weather weather={weather} city={searchCity} loading={loading} />
      <Forecast cordinate={cordinate} />
    </div>
  )
}

export default App
