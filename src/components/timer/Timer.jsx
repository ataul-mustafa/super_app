import React from 'react'
import CountDown from './countDown/CountDown'
import SetTimer from './setTimer/SetTimer'
import { useState } from 'react'

function Timer() {

    const [time, setTime] = useState(0);
    const [done, setDone] = useState(false);
    const [countDownKey, setCountDownKey] = useState(0);

    const recieveTime = (seconds) =>{
        setCountDownKey((prevKey) => prevKey + 1);
        setTime(seconds)
    }

    const onComplete = (val) => {
      setDone(val);
      if (val) {
        setTimeout(() => {
          setDone(false);
          
        }, 5000); 
      }
    };

  return (
    <div style={{height:'100%',display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <CountDown key={countDownKey} duration={time} completed={onComplete} />
        <SetTimer setSeconds = {recieveTime} hasComplete={done} />
    </div>
  )
}

export default Timer