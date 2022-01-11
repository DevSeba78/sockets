let input = document.getElementById("inputSocket");
let parrafo = document.getElementById("description");
let btn = document.getElementById("send");
let formDataUser = document.getElementById("dataUser");
let nameUser = document.getElementById("nameUser");
let emailUser = document.getElementById("emailUser");
let boton = document.getElementById("enviar");
let container_chat = document.getElementById("containerChat");
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
socket.on('loadUsers', data => {
    console.log('loads', data)
    
});

formDataUser.addEventListener('submit', (e) => {
    console.log(`click`);
    e.preventDefault();
    student = {
        name: nameUser.value,
        email: emailUser.value
    }
    //console.log(student)
    if (student.name === '' || student.email === '') {
        alert('No puede dejar campos vacios');
        window.location.reload();
    }
    //socket = io(); 
    socket.emit('addUser', student);
    container_chat.classList = "active";

    
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