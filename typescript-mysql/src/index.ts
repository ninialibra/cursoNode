import Server from './server/server';

const server = Server.init(3000);
server.start(()=>{
    console.log('Servidor corriendo en puerto 3000');    
});

