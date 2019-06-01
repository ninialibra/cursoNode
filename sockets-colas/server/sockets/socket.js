const { io } = require('../server');
const { TicketControl } = require('../clases/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //escuchar el cliente
    client.on('siguienteTicket', (data, callback)=>{
        
        callback(ticketControl.siguiente());          

    });

});