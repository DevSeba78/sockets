let {Server: IOServer} = require('socket.io');

class Socket {
    static instance;
    constructor(httpServer) {
        if(Socket.instance) {
            return Socket.instance;
        }
        Socket.instance = this;
        this.io = new IOServer(httpServer);
        this.mensajes = [];
        this.usuarios = [];
    }
    init() {
        try {
            this.io.on('connection', (socket) => {
                console.log('usuario conectado!');
                socket.emit('init', this.mensajes);

                socket.on('chat', (data) => {
                    
                    // let res = {
                    //     id: socket.id,
                    //     ...data
                    // }
                    this.mensajes.push(data);
                    console.log('chat', data);
                    this.io.sockets.emit('listenServer', this.mensajes);
                })
                socket.on('addUser', (data) => {
                    
                    let newUser = {
                        id: socket.id,
                        ...data,
                        active: true
                    }
                    this.usuarios.push(newUser);
                    console.log(data);
                    this.io.sockets.emit('loadUsers', this.usuarios);
                })
                socket.on('disconnection', (data) => {
                    
                    console.log('usuario desconectado')
                })
            });
        } catch (error) {
            console.log(error);
        }
            
        }
    }

    module.exports = Socket;
