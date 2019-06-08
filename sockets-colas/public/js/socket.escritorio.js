//comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio '+escritorio);

var label = $('small');

//escuchar
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

$('button').on('click', function () {

    //enviar informacion
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        
        if(resp === 'No hay tickets'){
            label.text(resp);  
            alert(resp);
            return;
        }

        label.text('ticket '+resp.numero);  
    });

})