import "./App.css";
import {WEATHER_BASE_URL, API_KEY, ICON_URL} from "./api";
import {useState} from "react";
import {Temperature} from "./Temperature";
import {TextField, Button} from "@mui/material";
import defaultIcon from "./assets/weather.png";

function App() {
  const [city, setCity] = useState("");
  const [temperatureK, setTemperatureK] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const getWeather = async e => {
    e.preventDefault();

    const res= await fetch(
      `${WEATHER_BASE_URL}appid=${API_KEY}&q=${city}`
    );
      
    if (res.ok) {
      const data = await res.json();
      const weather = data?.weather;
  
      if (data?.main?.temp) {
        setTemperatureK(data?.main.temp);
        setWeatherData(data);
      }
  
      if (weather?.length) {
        setIcon(`${ICON_URL + weather[0].icon}@2x.png`);
        setDescription(weather[0].description);
      }

    }  else {
      setErrorMessage('Unable to obtain data. Please input a correct city name.')
    }
    
  };

  function handleLocationChange(event) {
    setCity(event.target.value);
    setErrorMessage(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>WeatherInTown</h1>
      </header>
      <main>
        <div className="Box">

            {temperatureK ? (
              <Temperature
                temperatureK={temperatureK}
                icon={icon}
                description={description}
                city={weatherData.name}
              />
            ) : (
              <div className="Img-container"><img src={defaultIcon} className="Default-icon" alt="Weather" /></div>
            )}
            <form className="City-input" onSubmit={getWeather}>
              <TextField
                placeholder="Enter city name"
                onChange={handleLocationChange}
                label="City"
                error={errorMessage?.length ? true : false }
              />
              <p className="error">{errorMessage}</p>
              <Button variant="contained" type="submit" disabled={!city} aria-disabled={!city}>
                Find
              </Button>
            </form>
        </div>
      </main>
    </div>
  );
}

export default App;
