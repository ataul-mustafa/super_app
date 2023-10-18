// import React, { useEffect, useState } from 'react';
// import './WetherTime.css'

// import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
// import AirIcon from '@mui/icons-material/Air';
// import OpacityIcon from '@mui/icons-material/Opacity';

// function WetherTime() {

//     const [dateTime, setDateTime] = useState({
//         date: "",
//         time: ""
//     })

//     const [wether, setWether] = useState({
//         rain: {
//             speed: "",
//             Icon: ""
//         },
//         temp: null,
//         mbar: null,
//         windSpeed: null,
//         humadity: null,
//     })

//     useEffect(() => {
//         const date = new Date();

//         let hours = date.getHours();
//         let amPm = 'AM';
//         if (hours > 12) {
//             hours = hours - 12;
//             amPm = 'PM'
//         } else if (hours === 0) {
//             hours = 12;
//         }

//         const newDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
//         const time = `${hours}:${date.getMinutes()} ${amPm}`;

//         setDateTime({ date: newDate, time })

//     }, [])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const apiKey = 'd63fac4a843c49c284172756230710';
//                 const city = 'moradabad';
//                 const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
//                 const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        
//                 const data = await fetch(apiUrl, {
//                     headers: {
//                         'Origin': window.location.origin,
//                     },
//                 });
        
//                 const weatherData = await data.json();
        
//                 setWether({
//                     rain: {
//                         text: weatherData.current.condition.text,
//                         Icon: weatherData.current.condition.icon,
//                     },
//                     temp: weatherData.current.temp_c,
//                     mbar: weatherData.current.pressure_mb,
//                     windSpeed: weatherData.current.wind_kph,
//                     humidity: weatherData.current.humidity,
//                 });
//             } catch (error) {
//                 console.error('Error fetching weather data:', error);
//             }
//         };
        

//         fetchData();
//     }, []);

//     return (
//         <div className="weatherTime">
//             <div className="TimeDate">
//                 <div className="time">{dateTime.date}</div>
//                 <div className="date">{dateTime.time}</div>
//             </div>
//             <div className="wether">
//                 <div className="rain">
//                     <img src={wether.rain.Icon} alt="icon" />
//                     {
//                         wether.rain.text && 
//                         <div className='rainSpeed'>{wether.rain.text}</div>
//                     }
//                 </div>
//                 <div className="separator"></div>

//                 <div className="temp">
//                     <h1 className="celcius">{wether.temp}&deg;C</h1>
//                     <div className="mbar">
//                         <DeviceThermostatIcon className='mbarIcon' />
//                         {
//                             wether.mbar &&
//                             <p className="text">{wether.mbar} mbar pressure</p>
//                         }
//                     </div>
//                 </div>

//                 <div className="separator"></div>

//                 <div className="wind">
//                     <div className="windSec">
//                         <AirIcon className='icon' />
//                         <p>{wether.windSpeed} k/m wind</p>
//                     </div>
//                     <div className="humadity">
//                         <OpacityIcon className='icon' />
//                         <p>{wether.humadity}% humadity</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default WetherTime




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
        // Get current date and time
        const date = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setDateTime({ date: formattedDate, time: formattedTime });

        // Fetch weather data
        const apiKey = 'c79215adc0ab14c3c5ac5a84581a94c9';
        const city = 'moradabad'; // Replace with the desired city name
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                // console.log(data);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                // Handle error, e.g., set an error state
            }
        };

        fetchData();
    }, []);

    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    };

    if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
        return <div>Loading...</div>; // Or display an error message
    }

    // Ensure weatherData contains weather information before accessing its properties
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
