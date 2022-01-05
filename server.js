let express = require('express');
let {Server: IOServer} = require('socket.io');
let {Server: HttpServer} = require('http');

let app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let mensajes = [];
let backUp = "";

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})


io.on('connection', (socket) => {
    
    socket.on('chat', (data) => {
        
        let res = {
            id: socket.id,
            mensaje: data
        }
        mensajes.push(res);
        console.log(data);
        io.sockets.emit('listenServer', mensajes);
    })
    socket.emit('sala', mensajes);
    
    console.log(`a new user connected ${socket.id}`);
  
});

httpServer.listen(3000, () => console.log('listening on port 3000'));
