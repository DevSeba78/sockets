let input = document.getElementById('inputSocket');
let parrafo = document.getElementById('description');
let boton = document.getElementById('enviar');

const socket = io.connect();
socket.on('sala', data => {
    alert(data);
    socket.emit('notification', 'Hello from client');
})
input.addEventListener('onclick', (e) => {
        console.log(input.value);
        socket.emit('message', input.value);
        input.value = '';        
    
})