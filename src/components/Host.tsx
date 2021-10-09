import { useContext, useEffect } from "react"
import { SocketContext } from "../context/socket"

export interface Props {}

export interface IMessage {
    username: string;
    message: string;
  }

const Host: React.FC<Props> = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Successfully Connected to the Server");
          });
    });

    return (
        <div></div>
    )
}


export default Host