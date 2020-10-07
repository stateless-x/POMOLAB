import React, { useEffect, useState } from 'react'
const Timer = () =>{
    const [minute, setMinute] = useState(25)
    const [second, setSecond] = useState(0)
    const [timerType,setTimerType] = useState('session')
    const [isRunning, setIsRunning] = useState(false)
    
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

    const setCustom = (customTime) =>{
        setTimerType('custom')
        setIsRunning(false)
        setMinute(customTime)
        setSecond(0)
    }

    const countDown = () =>{
            const interval = setInterval(()=>{
                if(second === 0){
                    setMinute(minute-1)
                    setSecond(59)
                }else{
                    setSecond(second-1)
                }
            },1000)
            //return interval for clean up
            return interval
    }

    const resetTimer = () =>{
        if(isRunning){
            setIsRunning(false)
            switch(timerType){
                case 'session':
                    return setSession()
                case 'shortBreak':
                    return setShortBreak()
                case 'longBreak':
                    return setLongBreak()
                case 'custom':
                    return setCustom(minute+1)
                default:
                    return setSession()
            }
        }
    }

    const plusOne = () =>{
        if(isRunning === false){
            var customTime = minute < 40 ? minute+1 : minute
            setCustom(customTime)
        }
    }

    const minusOne = () =>{
        if(isRunning === false){
            var customTime = minute > 1 ? minute - 1: minute
            setCustom(customTime)
            }
    }
    
    const doubleDigit = (i) =>{
        i = i < 10 ? `0${i}` : i 
        return i
    }

    useEffect(()=>{
        if(isRunning){
            //change time value  
            const interval = countDown()
            //clean up
            return ( () => { 
                    clearInterval(interval)
                }
            )
        }
    },[isRunning,minute,second,timerType])

    const timerDisplay = {
        padding: "0.5em",
        fontSize:"100px"
    }

    return(
    <div>
        <div className="ui buttons ">
            <button className="ui button color red" onClick={()=>setSession()}>Session</button>
            <button className="ui button color red" onClick={()=>setShortBreak()}>Short break</button>
            <button className="ui button color red" onClick={()=>setLongBreak()}>Long break</button>
        </div>
        <br />
        <div>
            <h1 style={timerDisplay}>{doubleDigit(minute)}:{doubleDigit(second)}</h1>
        </div>
        <br />
        <div>
            <button className="ui compact icon button" onClick={()=>plusOne()}>
                <i className="icon plus"/>
            </button>
            <button className="ui compact icon button" onClick={()=>minusOne()}>
                <i className="icon minus" />
            </button>
        </div>
        <br/>
        <br/>
        <div>
            <button className="ui fade animated button color red" onClick={()=> setIsRunning(true)}>
                <div className="visible content">
                    <i className="icon play" />
                </div>
                <div className="hidden content">
                    Start
                </div>
            </button>

            <button className="ui fade animated button color red" onClick={()=> resetTimer()}>
                <div className="visible content">
                    <i className="icon redo alternate" />
                </div>
                <div className="hidden content">
                    Reset
                </div>
            </button>
        </div>
    </div>
    )
}
export default Timer