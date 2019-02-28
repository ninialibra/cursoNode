const axios = require("axios");

const getLugarLatLng = async(direccion) =>{

  let encodeURL = encodeURI(argv.direccion);

  let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`);

  if(resp.data.status==="ZERO_RESULTS"){
    throw new Error (`No hay resultados para la ciudad ${direccion}`);
  }

  let location = resp.data.results[0];
  let coordenadas = location.geometry.location;

  return {
    direccion: location.formatted_address,
    latitud: coordenadas.lat,
    longitud: coordenadas.lng
  }

}

module.exports = {
  getLugarLatLng
}
