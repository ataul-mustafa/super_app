import React, { useEffect, useState } from 'react';
import './WetherTime.css'

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

function WetherTime() {

    const [dateTime, setDateTime] = useState({
        date: "",
        time: ""
    })

    const [wether, setWether] = useState({
        rain: {
            speed: "",
            Icon: ""
        },
        temp: null,
        mbar: null,
        windSpeed: null,
        humadity: null,
    })

    useEffect(() => {
        const date = new Date();

        let hours = date.getHours();
        let amPm = 'AM';
        if (hours > 12) {
            hours = hours - 12;
            amPm = 'PM'
        } else if (hours === 0) {
            hours = 12;
        }

        const newDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
        const time = `${hours}:${date.getMinutes()} ${amPm}`;

        setDateTime({ date: newDate, time })

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'd63fac4a843c49c284172756230710';
                const city = 'moradabad';
                const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
                const weatherData = await data.json();

                setWether({
                    rain: {
                        text: weatherData.current.condition.text,
                        Icon: weatherData.current.condition.icon,
                    },
                    temp: weatherData.current.temp_c,
                    mbar: weatherData.current.pressure_mb,
                    windSpeed: weatherData.current.wind_kph,
                    humadity: weatherData.current.humidity,
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="weatherTime">
            <div className="TimeDate">
                <div className="time">{dateTime.date}</div>
                <div className="date">{dateTime.time}</div>
            </div>
            <div className="wether">
                <div className="rain">
                    <img src={wether.rain.Icon} alt="icon" />
                    {
                        wether.rain.text && 
                        <div className='rainSpeed'>{wether.rain.text}</div>
                    }
                </div>
                <div className="separator"></div>

                <div className="temp">
                    <h1 className="celcius">{wether.temp}&deg;C</h1>
                    <div className="mbar">
                        <DeviceThermostatIcon className='mbarIcon' />
                        {
                            wether.mbar &&
                            <p className="text">{wether.mbar} mbar pressure</p>
                        }
                    </div>
                </div>

                <div className="separator"></div>

                <div className="wind">
                    <div className="windSec">
                        <AirIcon className='icon' />
                        <p>{wether.windSpeed} k/m wind</p>
                    </div>
                    <div className="humadity">
                        <OpacityIcon className='icon' />
                        <p>{wether.humadity}% humadity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WetherTime