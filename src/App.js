import "./styles/App.css";
import { useState} from "react";
import {Temperature} from "./Temperature/Temperature";
import defaultIcon from "./assets/weather.png";
import { Form } from "./Form/Form";

function App() {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);


  function onData(data) {
    setLocationData(data.location);
    setWeatherData(data.current);
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
            <Form handleData={onData}/>
        </div>
      </main>
    </div>
  );
}

export default App;
