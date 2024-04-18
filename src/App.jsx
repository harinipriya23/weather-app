import { useEffect, useState } from 'react'
import './App.css';
import PropTypes from "prop-types";

// IMAGES
import searchIcon from "./assets/pics/search.jpg"
import clearIcon from "./assets/pics/clear.jpg"
import cloudIcon from "./assets/pics/cloud.jpg"
import humidIcon from "./assets/pics/humid.jpg"
import drizzleIcon from "./assets/pics/drizzle.jpg"
import rainIcon from "./assets/pics/rain.jpg"
import snowIcon from "./assets/pics/snow.jpg"
import windIcon from "./assets/pics/wind.webp"



const WeatherDetails = 
({icon,temp,city,country,lat,log,humid,wind}) =>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt='image' />
    </div>
    <div className='temp'>{temp}~C</div>
    <div className='location'>{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>Longitude</span>
        <span>{log}</span>
      </div></div>
      <div className="data-container">
      <div className='humid-container'>
        <div className="humid-element">
          <img src={humidIcon} alt='Humidity'
          className='icon'/>
          <div className="humid-data">{humid}%</div>
          <div className="humid-text">Humidity</div>
        </div>
      </div>
      <div className="wind-container">
       <div className="wind-element">
          <img src={windIcon} alt='wind'
          className='icon'/>
          <div className="wind-data">{wind}km/h</div>
          <div className="wind-text">Wind Speed</div>
        </div>
      </div>
      </div>
    </>
  )
}

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humid: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
}
function App() {
  let api_id = "afc100ed3f531b406f83af07b0919f31";

  const [text,setText] = useState("Chennai")
  const [icon,setIcon] = useState(clearIcon)
  const [temp,setTemp] = useState(0)
  const [city,setCity] = useState("")
  const [country,setCountry] = useState("IN")
  const [lat,setLat] = useState(0)
  const [log,setLog] = useState(0)
  const [humid,setHumid] = useState(0)
  const [wind,setWind] = useState(0)
  const [error,seterror] = useState(null)

  const [loading,setLoading] = useState(false)
  const [cityNotFound,setCityNotFound] = useState(false)
 
const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
  "50d": snowIcon,
  "50n": snowIcon,
}

const search = async() =>{
  setLoading(true)
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_id}&units=Metric`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    //console.log(data)
    if (data.cod === "404"){
      console.log("City not found")
      setCityNotFound(true)
      setLoading(false);
      return;
    }
      setHumid(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
      setCityNotFound(false)
    
  } catch (error) {
    console.log("An error occured:",error.message);
    seterror("An error occured in fetching in weather")
  } finally{
    setLoading(false)
  }
}
const handleCity = (e) => {
  setText(e.target.value);
}
const handleKeyDown = (e) => {
  if(e.key === "Enter"){
    search()
  }
}  
useEffect(function (){
  search();
}, []);
   return (
   <div>
    <div className='container'>
      <div className='input-container'>
        <input
        className='cityInput'
        placeholder='search  City'
        type='text' onChange={handleCity}
        value={text} onKeyDown={handleKeyDown}
        />
        <div className='search-icon' onClick={search}>
         <img src={searchIcon}
         alt='search'/>
        </div>
      </div>
      {/* < WeatherDetails icon={icon} temp={temp} city={city}
      country={country} lat={lat} log={log} humid={humid} 
      wind ={wind} /> 
     */}
    { error && <div className="error-msg">{error}</div>
    }{ loading && <div className="loading-text">Loading...</div>
    }{ cityNotFound && <div className='city-not-found'>City not found</div>}

  { ! loading && ! cityNotFound && < WeatherDetails icon={icon} temp={temp} city={city} 
      country={country} lat={lat} log={log} humid={humid} 
      wind ={wind} /> }

  <div className='design'>Designed by <span> JHJK</span></div>
  </div>
    </div>
  )
}

export default App
