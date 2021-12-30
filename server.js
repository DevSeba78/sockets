let express = require('express');
let {Server: IOServer} = require('socket.io');
let {Server: HttpServer} = require('http');

let app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
//io.init();
let mensajes = [];
let backUp = "";

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})
httpServer.listen(3000, () => console.log('listening on port 3000'));

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    console.log(mensajes);
    socket.on('notification', (data) => {
        backUp = data;
        mensajes.push({socketId: socket.id, mensaje: data});
        io.sockets.emit('message', mensajes);
        console.log(data);
    })
    socket.emit('sala', backUp);
});


//httpServer.listen(3000, () => console.log('listening on port 3000'));