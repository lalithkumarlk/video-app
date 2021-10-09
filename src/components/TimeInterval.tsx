import { useContext, useEffect, useRef, useState } from "react"

export interface Props {
    timer : number
}


const TimeInterval: React.FC<Props> = (data) => {

    const [seconds, setSeconds] = useState(-1);

    const [ isPlaySound,setPlaySound] = useState(false)


    useEffect(() => {

        setSeconds(data.timer)

        const interval  = setInterval(() => {
            setSeconds(seconds => seconds > 0 ? seconds - 1 : 0);
            
          }, 1000)

        return () => clearInterval(interval);

      },[data]);

    return (
        <div className="App">
        <header className="App-header">

            <h1>Timer : {data.timer}</h1>
            <h1>Second : {seconds}</h1>
            

        </header>
      </div>
    )

}

export default TimeInterval