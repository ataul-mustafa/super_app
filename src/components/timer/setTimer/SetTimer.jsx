import React, { useEffect } from 'react';
import './SetTimer.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';

function SetTimer({ setSeconds, hasComplete }) {


  const [time, setTime] = useState({
    hour: 0,
    minutes: 0,
    seconds: 0,
  })
  const [activeStopBtn, setActiveStopBtn] = useState(false);

  useEffect(() => {
    if (hasComplete) {
      setTime({
        hour: 0,
        minutes: 0,
        seconds: 0,
      })
      setActiveStopBtn(false);
    }
  }, [hasComplete])


  const startHandler = () => {
    if (time.hour || time.minutes || time.seconds) {
      setActiveStopBtn(true);

      const seconds = (time.hour * (60 * 60)) + (time.minutes * 60) + time.seconds;
      setSeconds(seconds);
    }

  }

  const stopHandler = () => {
    setSeconds(0);
    setActiveStopBtn(false);
    setTime({
      hour: 0,
      minutes: 0,
      seconds: 0
    })
  }

  return (
    <div className='setTimerCon'>
      <div className="heading">
        <h1>Hours</h1>
        <h1>Minutes</h1>
        <h1>Seconds</h1>
      </div>
      <div className="setTime">
        <div className="hourTime">
          <ArrowDropUpIcon onClick={() => { setTime({ ...time, hour: time.hour += 1 }) }} className='icon' />
          <h1>{
            time.hour < 10 ? `0${time.hour}` : time.hour
          }</h1>
          <ArrowDropDownIcon onClick={() => { setTime({ ...time, hour: time.hour > 0 ? time.hour -= 1 : 0 }) }} className='icon' />
        </div>
        <h1>:</h1>
        <div className="minuteTime">
          <ArrowDropUpIcon onClick={() => { setTime({ ...time, minutes: time.minutes += 1 }) }} className='icon' />
          <h1>{
            time.minutes < 10 ? `0${time.minutes}` : time.minutes
          }</h1>
          <ArrowDropDownIcon onClick={() => { setTime({ ...time, minutes: time.minutes > 0 ? time.minutes -= 1 : 0 }) }} className='icon' />
        </div>
        <h1>:</h1>
        <div className="secondTime">
          <ArrowDropUpIcon onClick={() => { setTime({ ...time, seconds: time.seconds += 1 }) }} className='icon' />
          <h1>{
            time.seconds < 10 ? `0${time.seconds}` : time.seconds
          }</h1>
          <ArrowDropDownIcon onClick={() => { setTime({ ...time, seconds: time.seconds > 0 ? time.seconds -= 1 : 0 }) }} className='icon' />
        </div>
      </div>
      {
        !activeStopBtn ?
          <button onClick={startHandler} className="btn">Start</button> :
          <button onClick={stopHandler} className="btn">Stop</button>
      }
    </div>
  )
}

export default SetTimer