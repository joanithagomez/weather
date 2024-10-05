import React, { useState, useEffect } from 'react';
import './Form.css';
import { Button, TextField } from '@mui/material';
import { WEATHER_BASE_URL } from '../api';

export function Form ({handleData}) {
  const [city, setCity] = useState(null);
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
      console.log('Location is not available.'); //location is off
    }
  }, []);

  function success (pos) {
    const crd = pos.coords;
    getWeather({
      q: `${crd.latitude},${crd.longitude}`
    });
  }

  function error(e) {
    console.log(e);
  }

  async function getWeather(params = {q: city}) {
    const res= await fetch(`${WEATHER_BASE_URL}current.json?key=${process.env.REACT_APP_API_KEY}&q=${params.q}`);
    if (res.ok) {
      const data = await res.json();
      handleData(data);
    } else {
      setErrorMessage('Unable to obtain data. Please input a correct city name.')
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    getWeather({
      q: city
    });
  }

  function handleLocationChange(event) {
    setCity(event.target.value);
    setErrorMessage(null);
  }

  return (
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
  );
}