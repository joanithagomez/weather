import './App.css';
import { useState } from 'react';
import { Temperature } from './Temperature';
import { TextField, Button } from '@mui/material';
import defaultIcon from './assets/weather.png';

function App() {
  const KEY = 'f62d966078f4bd9c3c9240a30733a941';
  const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
  const ICON_URL = "https://openweathermap.org/img/wn/";

  const [city, setCity] = useState('');

  const [temperatureK, setTemperatureK] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  async function fetchTemperature() {
          if (city) {
              const response = await fetch(`${BASE_URL}appid=${KEY}&q=${city}`);
              const data = await response.json();
              if (data?.main?.temp) {
                  setTemperatureK(data?.main.temp);
                  setWeatherData(data);
              }
              let weather = data?.weather;
              if (weather?.length) {
                  setIcon(`${ICON_URL + weather[0].icon}@2x.png`);
                  setDescription(weather[0].description);
              }
          }
  }

  function handleLocationChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Weather App
        </h1>
      </header>
      <main>
        <div className='Box'>
            {temperatureK ? <Temperature temperatureK={temperatureK} icon={icon} description={description} city={weatherData.name}/> 
              : <img src={defaultIcon} className='Default-icon' alt='Weather'/>
            }
            <div className='City-input'>
              <TextField placeholder="Enter city name" onChange={handleLocationChange} label="City"/>
              <Button variant="contained" onClick={fetchTemperature}>Find</Button>
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;
