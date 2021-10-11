let users = []

class Connection {


    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('disconnect', () => this.disconnect());

        // New user
        socket.on('new user', ({
            type
        }) => {
            console.log(`new user joined type : ${type}`)
            const notFound = users.find(itm => itm.id !== socket.id)
            console.log(`not found, `, notFound);

            const data = {
                id: socket.id,
                type
            };
            users.push(data);
            // socket.join("room 1");
            this.fetchUsers();

        });

        // Emit Timer Value
        socket.on('timer_value', ({
            val
        }) => this.emitTimerValue({
            val
        }))

        socket.on('data value_', (data) => this.emitDataValue(data))
    }


    // Emit New User
    emitNewUser(data) {
        console.log('*** ', data)
        this.io.emit('new user', data);
    }

    // Emit All Users
    fetchUsers() {
        this.io.emit('all_users', users);
    }

    // Emit Value
    emitTimerValue({
        val
    }) {
        console.log(`timer value_: ${val} by host ${this.socket.id}`)
        val > 0 && this.io.emit('timer_value_', {
            val
        });
    }

    // Emit Mute & Unmute All Users
    emitDataValue(data) {
        console.log(`data value_: ${data} by host ${this.socket.id}`)

        const {
            type
        } = data;

        users = users.map(user => {
            if (user.type !== "HOST") {
                user['isMute'] = type === "MUTE_ALL" ? true : false
            }
            return user
        })

        this.fetchUsers();
    }

    disconnect() {
        console.log(`disconnect`, this.socket.id)
        users = users.filter(user => user.id !== this.socket.id)
        for (let i = 0; i < users.length; i++) {
            if (this.socket.id === users[i].id) users.splice(i, 1);
        }
        console.log(`users : ${users.length}`)
        this.fetchUsers();
    }
}

function server(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket)
    });
};

module.exports = server;