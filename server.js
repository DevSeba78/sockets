let express = require('express');
let {Server: IOServer} = require('socket.io');
let {Server: HttpServer} = require('http');

let app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname,'index.html');
})
httpServer.listen(3000, () => console.log('listening on port 3000'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', 'Welcome to the chat app');
    socket.on('notification', (data) => {
        console.log(data);
    })
});


//httpServer.listen(3000, () => console.log('listening on port 3000'));