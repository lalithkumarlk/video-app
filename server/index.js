

class Connection{
    
    constructor(io,socket){
        this.io = io;
        this.socket = socket;

        socket.on('disconnect',() => this.disconnect());
    }

    disconnect(){
        console.log(`disconnect`)
    }
}

function server(io){
    io.on('connection',(socket) => {
        new createConnection(io,socket)
    });
};

module.exports = server;