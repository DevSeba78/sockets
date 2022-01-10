let express = require('express');
//let {Server: IOServer} = require('socket.io');
let {Server: HttpServer} = require('http');
let Socket = require('./utils/sockets');
let serverRouter = require('./routes')

let app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
io.init();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('./public'));

// serverRouter(app)

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: __dirname});
})


httpServer.listen(3000, () => console.log('listening on port 3000'));
