import React, { useState, useEffect, useRef } from 'react';
import './CountDown.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import audio from '../../images/done.mp3'



const CountDown = ({ duration, completed }) => {
    
    const audioRef = useRef(null);
    const [doneMusic, setDoneMusic] = useState(false);
    const [key,setKey] = useState(0);
    const [play, setPlay] = useState(false);


    useEffect(() => {
        setPlay(true);
        setKey(prevKey => prevKey + 1); 
        setDoneMusic(false); 
    }, [duration]);


    useEffect(()=>{
        const music = audioRef.current;
        doneMusic ? music.play() : music.pause()
    }, [doneMusic])


    const remaintingTime = (time)=>{

        let hours = time >= (60*60) ? parseInt(time/(60*60)) : 0;
        hours = hours < 10 ? `0${hours}` : hours;
    
        let remainSec = time >= (60*60) ? time % (60*60) : time;
    
        let minutes = remainSec >= 60 ? parseInt(remainSec/60) : 0;
    
        minutes = minutes < 10 ? `0${minutes}`: minutes;
    
        remainSec = remainSec >= 60 ? remainSec % 60 : remainSec;
    
        remainSec = remainSec < 10 ? `0${remainSec}` : remainSec;
    
        let fullTime = `${hours}:${minutes}:${remainSec}`;
    
        return fullTime;
    }

    const handleComplete = () =>{
        // console.log('handle complete')
        setPlay(false);
        completed(true);
        setDoneMusic(true);
    }

    return(
        <div className='countDownCon'>
        <div className="circle">
            <CountdownCircleTimer
                key={key}
                isPlaying={play}
                duration={duration || 0}
                size={120}
                colors={['#FF6A6A']}
                className='circle'
                trailColor='transparent'
                strokeWidth={6}
                updateInterval={0}
                onComplete={handleComplete}
            >
                {({ remainingTime }) => remaintingTime(remainingTime)}
            </CountdownCircleTimer>
        </div>
        <audio ref={audioRef} src={audio} type="audio/mpeg" />
    </div>
    )
}

export default CountDown;