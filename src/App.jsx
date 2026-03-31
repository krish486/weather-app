import Navbar from './components/Navbar'
import Forecast from './components/Forecast'
import Weather from './components/Weather'
import axios from 'axios'
import { useEffect, useState } from 'react'


const App = () => {

  let [city, setCity] = useState("")

  let [cordinate, setCordinate] = useState(null)

  let [weather, setWeather] = useState(null)

  const [loading, setLoading] = useState(false)



  let getCord = async (city) => {
    let res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
    setCordinate({ longitude: res.data.results[0].longitude, latitude: res.data.results[0].latitude })
  }

  let getweather = async ({ longitude, latitude }) => {
    let res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,rain,temperature_2m,weather_code,relative_humidity_2m`)

    

    setWeather(res.data.current)
    
    setLoading(false)
  }

  let handleCitySearch = () => {
    setLoading(true);
    getCord(city);
  }

  useEffect(() => {
    if (cordinate) {
      getweather(cordinate);
    }
  }, [cordinate]);


  return (
    <div className='h-screen w-screen flex flex-col items-center justify-start gap-8 '>
      <Navbar handleCitySearch={handleCitySearch} setCity={setCity} city={city} />
      <Weather weather={weather} city={city} loading={loading} />
      <Forecast cordinate={cordinate} />
    </div>
  )
}

export default App
