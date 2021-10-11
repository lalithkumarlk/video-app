import { Modal } from "@material-ui/core";
import { useContext, useEffect, useReducer, useRef, useState } from "react"

export interface Props {
    timer : number
}

const TimeInterval: React.FC<Props> = (data) => {
  const AUDIO_URL = `https://assets.coderrocketfuel.com/pomodoro-times-up.mp3`;
  const AudioPlay = new Audio(AUDIO_URL);

    const [counter, setCounter] = useState(-1);

    const playSound = () => {
      var playPromise = AudioPlay.play();
    }



    useEffect(() => {
        setCounter(data.timer)
        const interval  = setInterval(() => {
            setCounter(counter =>counter > 0 ? counter-1 : 0);
        }, 1000)
  
       return () => clearInterval(interval);
       
      },[data]);


    useEffect(()=>{
        data.timer > 0 && counter === 0 && playSound()
      },[counter])

       
    return (
      <div>
             {counter > 0 &&<h6 className='text-secondary' > Timer : { counter}</h6>  }
        </div>
    )

}

export default TimeInterval