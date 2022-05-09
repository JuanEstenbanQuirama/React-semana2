import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navigator = () => {

    const [weather, setWeather] = useState({});

    const [isTemperature, setIsTemperature] = useState(true);

    useEffect(() => {
        function success(pos) {
            var crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get (`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a16066540624331ed130e29bf6148bfd`)
                .then(res => setWeather(res.data))
            
        }
          
        function error(err) {
            console.warn(`User denied acces to location`);
        }
          
        navigator.geolocation.getCurrentPosition(success, error);

    }, [])
    const changeTemp = () => setIsTemperature(!isTemperature);
  console.log(weather)
  return (
    <div className="App">
      <div className="container">
        <h1>Weather <span>App</span></h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <div className="container-weather">
          <div className="container-temp">
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <h2 className="temperature"> {isTemperature ? `${Math.floor(weather.main?.temp - 273.15)} °C` : `${weather.main?.temp} °K`}</h2>
            <small><b> min: {isTemperature ? `${Math.round(weather.main?.temp_min - 273.15)} °C` : `${weather.main?.temp_min} °K`} / max: {isTemperature ? `${Math.round(weather.main?.temp_max - 273.15)} °C` : `${weather.main?.temp_max} °K`}</b></small>
          </div>
          <div className="container-info">
            <h2>Weather information</h2>
            <h3 className="weatherInfo">"<div className="info-element">{weather.weather?.[0].description}</div>"</h3>
            <h3> <div className="info-element">Wind speed:</div>  {weather.wind?.speed} m/s</h3>
            <h3> <div className="info-element">Pressure:</div>  {weather.main?.pressure} mb</h3>
            <h3> <div className="info-element">Humidity:</div>  {weather.main?.humidity}%</h3>
          </div>
        </div>
        <button onClick={changeTemp}>{isTemperature? "Cambiar Celcius a Kelvin" : "Cambiar Kelvin a Celcius"}</button> 
      </div>
    <footer>Hecho con 💖​ en Academlo</footer>
    </div>
    );
};

export default Navigator;