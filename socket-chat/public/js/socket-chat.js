var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuarios conectados', resp);
        
    });

});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);
});

//escuchar cambios de usuarios (cuando entra o sale del chat)
socket.on('listaPersonas', function (personas) {
    console.log(personas);
});

//mensaje privado
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado:',mensaje);
    
});