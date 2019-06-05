//comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

//escuchar
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function (data) {
    label.text(data.actual);
});

$('button').on('click', function () {

    //enviar informacion
    socket.emit('siguienteTicket', {}, function(siguienteTicket){
        label.text(siguienteTicket);
    });

})