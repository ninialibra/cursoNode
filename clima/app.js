const lugar = require('./lugar/lugar.js');
const clima = require('./lugar/clima.js');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: "Dirección de la ciudad para obtener el clima",
    demand: true
  }
}).argv;

/*lugar.getLugarLatLng(argv.direccion)
  .then(resp => {
    console.log(resp);
  })
  .catch(e => console.log(e))*/

let getInfo = async (direccion)=>{

  //let coordenadas = await lugar.getLugarLatLng(direccion);
  let temp = await clima.getClima(43.534278, -5.662101);

  return `El clima en ${direccion} es de ${temp} grados`;
}

getInfo(argv.direccion)
  .then(resp => {
    console.log(resp);
  })
  .catch(e => console.log(e))

/*clima.getClima(43.534278, -5.662101)
  .then(resp => {
    console.log(resp);
  })
  .catch(e => console.log(e))*/
