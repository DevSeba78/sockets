let input = document.getElementById("inputSocket");
let parrafo = document.getElementById("description");
let boton = document.getElementById("enviar");

const socket = io.connect();

socket.on('listenServer', data => {
    console.log(`recibiendo desde el servidor`, data);
    let inner = "";
    data.forEach(element => {
        inner += `<b>${element.id}</b> ${element.mensaje}<br>`;
    
    });
    parrafo.innerHTML = inner;
});
socket.on('sala', data => {
    console.log(`recibiendo...`, data);
    let inner = "";
    data.forEach(element => {
        inner += `<b>${element.id}</b> ${element.mensaje}<br>`;
    
    });
    parrafo.innerHTML = inner;
})

boton.addEventListener(`click`, (e) => {
    
        console.log(input.value);
        socket.emit('chat', input.value);
        input.value = '';        
    
})