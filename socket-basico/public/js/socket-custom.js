var socket = io();

//escuchar
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

//enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Tania',
    mensaje: 'Hola Mundo'
}, function (respuesta) {
    console.log('Respuesta servidor: ', respuesta);
});

//escuchar informacion
socket.on('enviarMensaje', function (data) {
    console.log('Servidor:', data);
});