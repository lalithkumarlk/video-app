import { useCallback, useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/socket"
import { IUser } from "./Participant";
import { Avatar, Box, Button, Chip, Grid, styled } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { Height } from "@material-ui/icons"
import { Col, Container, Figure, Stack } from "react-bootstrap"
import User from '../components/user.png'

import Close from '@material-ui/icons/Close'
import VideoCall from '@material-ui/icons/VideoCall'
import CallEnd from '@material-ui/icons/CallEnd'
import Group from '@material-ui/icons/Group'
import GroupWork from '@material-ui/icons/GroupWork'
import MicOff from '@material-ui/icons/MicOff'


export interface Props {}


const Host: React.FC<Props> = () => {

    const counterLabel = `Counter Timers -->`
    
    const socket = useContext(SocketContext);

    const [isActive, setActive] = useState(false);

    const [users,setUsers] = useState<IUser[]>([])

    const toggleClass = () => {
       
      };

    // Emit Timer Value to Participant
    const handle = (val : any) => {
        console.log(val);
        socket.emit('timer_value',{val : val});
    }

    const handleAllMute = () => {
        setActive(!isActive);
        console.log('mute all ')
        const data = {
            type : isActive ? 'MUTE_ALL' : 'UN_MUTE_ALL'
        }
        socket.emit('data value_',data);
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
            data = data.filter(itm => itm.type !== 'HOST');
            const val = Array.from(new Set([...users,...data]));
            setUsers(val)
        })

    },[socket]);


    useEffect(() => {
        console.log()
    },[users])

    return (
        <div>

            <div className="container bg-black">
                <div className="row">
                    {users.map((user,index) => {
                        return (<div key={index} className="col-md-6 border border-white"> 
                          <Chip label={`${user.type}${index+1}`} size='medium' />
                          {user.isMute && <Avatar className="me-2">
                                    <MicOff />
                                </Avatar>}
                        <img src={User} width="460" height="325"></img>
                        </div>)
                    })}
                    <div className="col-md-12 col bg-black">
                        <div className="row justify-content-md-center row-cols-3">
                            <div className="col-md-8 col  ">
                                <Stack direction="horizontal">
                                <Avatar className="me-2">
                                    <VideoCall />
                                </Avatar>
                                <Avatar className="me-2" onClick={()=> handleAllMute()}>
                                    <MicOff />
                                </Avatar>
                                <Avatar className="me-2">
                                    <CallEnd />
                                </Avatar>
                                <Avatar className="me-2">
                                    <Group />
                                </Avatar>
                                
                                  <h1 className="">  {counterLabel} </h1>
                                  
                                    <Chip label="15 s" onClick={()=> handle(15)} size='medium' />
                                    <Chip label="30 s" onClick={()=> handle(30)} size='medium' />
                                    <Chip label="45 s" onClick={()=> handle(45)} size='medium'/>
                                    <Chip label="60 s" onClick={()=> handle(60)} size='medium' />
                                    
                                </Stack>
                                
                            </div>
                            <div className="col-md-2 col">
                                <img className="border border-grey" src={User} width="150" height="150"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}


export default Host