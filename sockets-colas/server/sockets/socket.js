const { io } = require('../server');
const { TicketControl } = require('../clases/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //escuchar el cliente
    client.on('siguienteTicket', (data, callback)=>{
        
        callback(ticketControl.siguiente());        
    });
    
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket()
    });

    client.on('atenderTicket', (data, callback)=>{

        if(!data.escritorio){
            callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
    });

});