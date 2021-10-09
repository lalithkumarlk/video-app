import { useCallback, useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/socket"
import { IUser } from "./Participant";

export interface Props {}


const Host: React.FC<Props> = () => {
    
    const socket = useContext(SocketContext);

    const [users,setUsers] = useState<IUser[]>([])


    const handleTimer = useCallback((e) => {
        console.log(e);
        socket.emit('timer_value',{val : 10});
      }, []);


    const handle = (val : any) => {
        console.log(val);
        socket.emit('timer_value',{val : val});
    }

    useEffect(() => {
        socket.on("connect", (data : IUser) => {
            console.log("Successfully Connected to the Server");

            socket.emit('new user', {
                type : "HOST"
            });
            
          });



        socket.on("all_users",(data : IUser[])=> {
            console.log("all users",data);
            const val = Array.from(new Set([...users,...data]));
            setUsers(val)
        })

    },[socket]);

    return (
        <div>
           Users : {users.length}

           <button onClick={() => handle(15)}>
                15
            </button>
        
            <button onClick={() => handle(30)}>
                30
            </button>
            <button onClick={() => handle(45)}>
                45
            </button>
            <button onClick={() => handle(60)}>
                60
            </button>
        </div>
    )
}


export default Host