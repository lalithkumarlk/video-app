import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/socket"
import TimeInterval from "./TimeInterval";
import { Avatar, Box, Button, Chip, Grid, styled } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { Height } from "@material-ui/icons"
import { Col, Container, Figure, Row, Stack } from "react-bootstrap"
import React from 'react';
import User from '../components/user.png'
import User1 from '../components/user-1.png'
import Close from '@material-ui/icons/Close'
import VideoCall from '@material-ui/icons/VideoCall'
import CallEnd from '@material-ui/icons/CallEnd'
import Mic from '@material-ui/icons/Mic'
import MicOff from '@material-ui/icons/MicOff'

export interface Props {}

export interface IUser {
      type : string
      id: string | number
      isMute?: boolean
  }

export interface IPart {
    timer : number
}

const Participant: React.FC<Props> = () => {
    
    const socket = useContext(SocketContext);
    const [users,setUsers] = useState<IUser[]>([])
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

          socket.on("all_users",(data : IUser[])=> {
            console.log("all users",data);
            setUsers([])
            data = data.filter(itm => itm.type !== 'HOST');
           // const val = Array.from(new Set([...users,...data]));
            setUsers(data)
        })

    },[socket]);


    return (
        <div>
           
            {/* Timer Value {data?.timer} */}
            <TimeInterval timer={data?.timer} />
            <div className="container-fluid">
                <Row style={{height:'100vh'}}>
                    <Col className="col-md-2 bg-primary overflow-auto" style={{height: '100vh'}}>
                    {users.map((user,index) => {
                        return (
                        <div key={index} className="border border-white">
                        <img src={User1} style={{height:'20vh'}}></img>
                        <br />
                        <Chip label={`participant ${index+1}`} size="small"></Chip>
                        {user.isMute && <Avatar className="me-2" sizes="small">
                                    <MicOff/>
                                </Avatar>}
                        </div>)
                    })}
            
                    </Col>
                    <Col className="col-md-10 bg-dark">
                    col2
                    <div>
                        <img src={User} style={{height:'80vh', width:'100vh'}}></img>
                    </div>
                    </Col>
                    <Col className="col-md-10 offset-md-2 position-absolute bg-dark fixed-bottom">

                    <Row>
                        <Col className="mt-3">
                        <Chip className="float-start" label={`host`} size="small"></Chip>
                        </Col>
                        <Col className="mt-3">
                        <Stack direction="horizontal">
                            <Avatar className="me-2"> <VideoCall /> </Avatar>
                            <Avatar className="me-2"> <MicOff /> </Avatar>
                            <Avatar className="me-2"> <CallEnd /></Avatar>
                        </Stack>
                        </Col>
                        <Col>
                        <div>
                        
                            <img src={User} style={{height:'10vh', width:'10vh'}}></img>
                        </div>
                        </Col>
                    </Row>

                    </Col>
                </Row>
              

            </div>
           
        </div>
    )
}


export default Participant