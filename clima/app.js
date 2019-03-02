const lugar = require('./lugar/lugar.js');
const clima = require('./lugar/clima.js');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: "Dirección de la ciudad para obtener el clima",
    demand: true
  }
}).argv;

let getInfo = async (direccion)=>{

  try{

    //let coordenadas = await lugar.getLugarLatLng(direccion);
    let temp = await clima.getClima(43.534278, -5.662101);

    return `El clima en ${direccion} es de ${temp} grados`;

  }catch(e){
    return `No se pudo consultar el clima en ${direccion}`;
  }

}

getInfo(argv.direccion)
  .then(resp => {
    console.log(resp);
  })
  .catch(e => console.log(e))
