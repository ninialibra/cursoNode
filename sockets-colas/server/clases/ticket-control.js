class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        let data = require('../data/data.json');

        console.log(data);

    }

}

module.exports = {
    TicketControl
}