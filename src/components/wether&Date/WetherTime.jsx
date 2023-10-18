import React, { useEffect, useState } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import './WetherTime.css';

function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const [dateTime, setDateTime] = useState({
        date: "",
        time: ""
    });

    useEffect(() => {
        const date = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setDateTime({ date: formattedDate, time: formattedTime });

        const apiKey = 'c79215adc0ab14c3c5ac5a84581a94c9';
        const city = 'moradabad'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    };

    if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
        return <div>Loading...</div>;
    }

    const weatherDescription = weatherData.weather && weatherData.weather.length > 0 ? weatherData.weather[0].description : '';
    const pressure = weatherData.main && weatherData.main.pressure ? weatherData.main.pressure : '';
    const windSpeed = weatherData.wind && weatherData.wind.speed ? weatherData.wind.speed : '';
    const humidity = weatherData.main && weatherData.main.humidity ? weatherData.main.humidity : '';

    return (
        <div className="weatherTime">
            <div className="TimeDate">
                <div className="time">{dateTime.date}</div>
                <div className="date">{dateTime.time}</div>
            </div>
            <div className="wether">
                <div className="rain">
                    <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt='weather icon' />
                    <div className='rainSpeed'>{weatherDescription}</div>
                </div>
                <div className="separator"></div>

                <div className="temp">
                    <h1 className="celcius">{weatherData.main.temp}&deg;C</h1>
                    <div className="mbar">
                        <DeviceThermostatIcon className='mbarIcon' />
                        {pressure && <p className="text">{pressure} mbar pressure</p>}
                    </div>
                </div>

                <div className="separator"></div>

                <div className="wind">
                    <div className="windSec">
                        <AirIcon className='icon' />
                        {windSpeed && <p>{windSpeed} k/m wind</p>}
                    </div>
                    <div className="humadity">
                        <OpacityIcon className='icon' />
                        {humidity && <p>{humidity}% humidity</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherComponent;
