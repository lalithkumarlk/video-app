import { useContext, useEffect, useReducer, useRef, useState } from "react"

export interface Props {
    timer : number
}

const TimeInterval: React.FC<Props> = (data) => {

    const [counter, setCounter] = useState(data.timer);

    const playSound = () => {
      const AUDIO_URL = `https://assets.coderrocketfuel.com/pomodoro-times-up.mp3`;
      new Audio(AUDIO_URL).play();
    }

    useEffect(() => {
        setCounter(data.timer)
        const interval  = setInterval(() => {
            setCounter(counter =>counter > 0 ? counter-1 : 0);
        }, 1000)
  
       return () => clearInterval(interval);
       
      },[data]);


    useEffect(()=>{
        counter === 0 && playSound()
      },[counter])

       
    return (
        <div className="App">
        <header className="App-header">
            <h1>Second : { counter}</h1>
        </header>
      </div>
    )

}

export default TimeInterval