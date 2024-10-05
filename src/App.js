import "./styles/App.css";
import {WEATHER_BASE_URL} from "./api";
import { useEffect, useState} from "react";
import {Temperature} from "./Temperature";
import {TextField, Button} from "@mui/material";
import defaultIcon from "./assets/weather.png";

function App() {
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const geo_options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, geo_options);
    } else {
      //location is off
      console.log('Location is not available.')
    }
  }, []);

  const success = (pos) => {
    const crd = pos.coords;
    getWeather({
      q: `${crd.latitude},${crd.longitude}`
    });
  }

  const error = (e) => {
    console.log(e);
  }


  async function getWeather(params = {q: city}) {
    console.log(params);
    const res= await fetch(`${WEATHER_BASE_URL}current.json?key=${process.env.REACT_APP_API_KEY}&q=${params.q}`);

    if (res.ok) {
      const data = await res.json();
      setWeatherData(data.current);
      setLocationData(data.location);
    } else {
      setErrorMessage('Unable to obtain data. Please input a correct city name.')
    }
  };

  function handleLocationChange(event) {
    setCity(event.target.value);
    setErrorMessage(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getWeather({
      q: city
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>WeatherInTown</h1>
      </header>
      <main>
        <div className="box">

            { weatherData && locationData ? (
              <Temperature
                tempC={weatherData.temp_c}
                tempF={weatherData.temp_f}
                icon={weatherData.condition.icon}
                description={weatherData.condition.text}
                city={locationData.name + ', ' + locationData.region}
                localTime={locationData.localtime}
              />
            ) : (
              <div className="img-container"><img src={defaultIcon} className="default-icon" alt="Weather" /></div>
            )}
            <form className="city-input" onSubmit={handleSubmit}>
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
