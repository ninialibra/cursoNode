const {io} = require('../server');

io.on('connection', (client)=>{

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    });

    //escuchar el cliente
    client.on('enviarMensaje', (data, callback)=>{
        
        //broadcast a todo el mundo
        client.broadcast.emit('enviarMensaje', data);

        /* if(mensaje.usuario){
            callback({
                respuesta: 'Todo salió bien' 
            });    
        }else{
            callback({
                respuesta: 'Todo salió MAL!!!!!!!' 
            });    
        } */

    });

});