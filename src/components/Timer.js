import React, { useEffect, useState } from 'react'
import Donation from './Donation'
import useSound from 'use-sound'
import '../styles/timer.css'
import sessionStart from '../sounds/sessionStart.mp3'
import shortBreakStart from '../sounds/breakStart.mp3'
import longBreakStart from '../sounds/longBreakStart.mp3'
import sessionEnd from '../sounds/sessionEnd.mp3'
import shortBreakEnd from '../sounds/breakEnd.mp3'
import longBreakEnd from '../sounds/longBreakEnd.mp3'


const Timer = () =>{
    const [minute, setMinute] = useState(25)
    const [second, setSecond] = useState(0)
    const [timerType,setTimerType] = useState('session')
    const [isRunning, setIsRunning] = useState(false)
    const [counter, setCounter] = useState(0)
    //use-sound
    const [playbackRate, setPlaybackRate] = React.useState(1.15);
    //cycle counter
    const progress = `${counter} of 4 Sessions`

/*====================================== Timer Properties =======================================*/   
    const setSession = () =>{
            setTimerType('session')
            setIsRunning(false)
            setMinute(25)
            setSecond(0)
    }

    const setShortBreak = () =>{
            setTimerType('shortBreak')
            setIsRunning(false)
            setMinute(5)
            setSecond(0)
    }

    const setLongBreak = () =>{
            setTimerType('longBreak')
            setIsRunning(false)
            setMinute(20)
            setSecond(0)
    }
   /*====================================== Sound Properties=======================================*/
    const [sesStart] = useSound(
        sessionStart,
        {playbackRate, volume: 0.25}
      );

      const [sbrStart] = useSound(
        shortBreakStart,
        {playbackRate, volume: 0.25}
      );

      const [lbrStart] = useSound(
        longBreakStart,
        {playbackRate, volume: 0.25}
      );
      
      const [sesEnd] = useSound(
        sessionEnd,
        {playbackRate, volume: 0.25}
      );

      const [sbrEnd] = useSound(
        shortBreakEnd,
        {playbackRate, volume: 0.25}
      );

      const [lbrEnd] = useSound(
        longBreakEnd,
        {playbackRate, volume: 0.25}
      );
   /*==========================================================================================*/
   const countDown = () =>{
            const id = setInterval(()=>{
                //the numbers look kindda yikes, if not lazy may change later
                if(second === 0 && minute >=1){
                    setMinute(minute-1)
                    setSecond(59)
                }else if(second === 0 && minute ===0){
                    setIsRunning(false)
                    soundTheAlarm()
                    clearInterval(countDown)
                    //the last session ends with long break 
                    if(timerType==='session'&& counter!==3){
                        setShortBreak()
                        setCounter(counter+1)
                    }else if(timerType==='session'&& counter===3){
                        setLongBreak()
                        setCounter(counter+1)
                    }else if(timerType==='longBreak' && counter===4){
                        setCounter(0)
                    }else{
                        setSession()
                    }
                }else{
                    setSecond(second-1)
                }
            },945 )//945ms
            
            //id for cleaning up
            return id
    }
   
    const moreTime = () =>{
        if(isRunning === false){
            var time = minute < 40 ? minute+1 : minute
            setMinute(time)
        }
    }

    const lessTime = () =>{
        if(isRunning === false){
            var time = minute > 1 ? minute - 1: minute
            setMinute(time)
            }
    }
    
    const doubleDigit = (i) =>{
        i = i < 10 ? `0${i}` : i 
        return i
    }

    const startTimer = () =>{
        if(!isRunning){
            setIsRunning(true)
            switch(timerType){
                case 'session':
                    return sesStart()
                case 'shortBreak':
                    return sbrStart()
                case 'longBreak':
                    return lbrStart()
                default: 
                    return null
            }
        }
    }

    const resetTimer = () =>{
        setIsRunning(false)
            switch(timerType){
                case 'session':
                    return setSession()
                case 'shortBreak':
                    return setShortBreak()
                case 'longBreak':
                    return setLongBreak()
                default:
                    return setSession()
            }
    }

    const soundTheAlarm = () =>{
            switch(timerType){
                case 'session':
                    return sesEnd()
                case 'shortBreak':
                    return sbrEnd()
                case 'longBreak':
                    return lbrEnd()
                default: 
                    return null
            }
    }
    
    useEffect(()=>{
        if(isRunning){
            //change time value
            const id = countDown()
            document.title=`${(minute)}:${doubleDigit(second)}`
            //clean up
            return ( () => { 
                    clearInterval(id)
                }
            )
        }
    },[countDown])
    
    return(
        <div>
            <div>
                <button className="customBtn" onClick={()=>setSession()}>Session</button>
                <button className="customBtn" onClick={()=>setShortBreak()}>Short break</button>
                <button className="customBtn" onClick={()=>setLongBreak()}>Long break</button>
            </div>
            <div>
                <h1 className="display">{doubleDigit(minute)}:{doubleDigit(second)}</h1>
            </div>
            <div className="timerconfig">
                <button className="ui compact icon button" onClick={()=>moreTime()}>
                    <i className="icon plus"/>
                </button>
                <button className="ui compact icon button" onClick={()=>lessTime()}>
                    <i className="icon minus" />
                </button>
            </div>
            <div className="controllerBtn">
                <button className="ui fade animated button color white" onClick={()=>startTimer()}>
                    <div className="visible content">
                        <i className="icon play" />
                    </div>
                    <div className="hidden content">
                        Start
                    </div>
                </button>
                <button className="ui fade animated button color white" onClick={()=> resetTimer()}>
                    <div className="visible content">
                        <i className="icon redo alternate" />
                    </div>
                    <div className="hidden content">
                        Reset
                    </div>
                </button>
                {progress}
            </div>
        </div>
    )
}
export default Timer