import React, { useEffect, useState } from 'react'
import './timer.css'

const Timer = () =>{
    const [minute, setMinute] = useState(25)
    const [second, setSecond] = useState(0)
    const [timerType,setTimerType] = useState('session')
    const [isRunning, setIsRunning] = useState(false)
    const [counter, setCounter] = useState(0)
    
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

    const countDown = () =>{
            const interval = setInterval(()=>{
                //the numbers look kindda yikes, but meh it works!
                if(second === 0 && minute >=1){
                    setMinute(minute-1)
                    setSecond(59)
                }else if(second === 0 && minute ===0){
                    setIsRunning(false)
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
                    window.alert(timerType)
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
                default:
                    return setSession()
            }
        }
    }

    const plusOne = () =>{
        if(isRunning === false){
            var time = minute < 40 ? minute+1 : minute
            setMinute(time)
            // setCustom(customTime)
        }
    }

    const minusOne = () =>{
        if(isRunning === false){
            var time = minute > 1 ? minute - 1: minute
            // setCustom(customTime)
            setMinute(time)
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

    const progress = `${counter} of 4 Sessions`
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
            <button className="ui compact icon button" onClick={()=>plusOne()}>
                <i className="icon plus"/>
            </button>
            <button className="ui compact icon button" onClick={()=>minusOne()}>
                <i className="icon minus" />
            </button>
        </div>
        <div>
            <button className="ui fade animated button color white" onClick={()=> setIsRunning(true)}>
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