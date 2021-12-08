const socket = io.connect();
socket.on('message', data => {
    alert(data);
    socket.emit('notification', 'Hello from client');
})