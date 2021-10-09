import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/socket"
import TimeInterval from "./TimeInterval";

export interface Props {}

export interface IUser {
      type : string
      id: string | number
  }

export interface IPart {
    timer : number
}

const Participant: React.FC<Props> = () => {
    
    const socket = useContext(SocketContext);
    const [data,setData]=useState<IPart>({
        timer : 0
    })

   
    
    useEffect(() => {
        socket.on("connect", (data : IUser) => {
            console.log("Successfully Connected to the Server");

            socket.emit('new user', {
                type : "PARTICIPANT"
            });

          });
        
        socket.on("timer_value_", (res : any) => {
            console.log("Successfully Recived Timer Value ", res);
            const val : IPart = { timer : res.val}
            setData(val);
          });

    },[socket]);


    return (
        <div>
            Timer Value {data?.timer}
           <TimeInterval timer={data?.timer} />
        </div>
    )
}


export default Participant