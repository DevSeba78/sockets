let input = document.getElementById("inputSocket");
let parrafo = document.getElementById("description");
let boton = document.getElementById("enviar");
let formDataUser = document.getElementById("dataUser");
let student = null;

const socket = io.connect();

socket.on('init', data => {
    console.log(`recibiendo...`, data);
    let inner = "";
    data.forEach(element => {
        inner += `<b>${element.name}</b> ${element.mensaje}<br>`;
    
    });
    parrafo.innerHTML = inner;
})

socket.on('listenServer', data => {
    console.log(`recibiendo desde el servidor`, data);
    let inner = "";
    data.forEach(element => {
        inner += `<b>${element.name}</b> ${element.mensaje}<br>`;
    
    });
    parrafo.innerHTML = inner;
});

formDataUser.addEventListener('submit', (e) => {
    e.preventDefault();
    student = {
        name: e.target[0].value,
        email: e.target[1].value
    }
    if (student.name === '' || student.email === '') {
        alert('No puede dejar campos vacios');
        window.location.reload();
    } 
    socket.emit('addUser', student);

    // let data = {
    //     name: input.value
    // }
    // socket.emit('addUser', data);
    // input.value = '';
})

boton.addEventListener(`click`, (e) => {
        e.preventDefault();
        let sendMessage = {
            ...student,
            mensaje: input.value
        }
        socket.emit('chat', sendMessage);
        input.value = '';        
    
})