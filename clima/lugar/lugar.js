const axios = require("axios");


const getLugarLatLng = async(direccion) =>{

  let encodeURL = encodeURI(argv.direccion);

  let respuesta = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`);

  

  return {
    direccion,
    latitud,
    longitud
  }

}




axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
.then(resp=>{

  let location = resp.data.results[0];
  let coordenadas = location.geometry.location;

  console.log("Dirección: "+location.formatted_address);
  console.log("Latitud: "+coordenadas.lat);
  console.log("Longitud: "+coordenadas.lng);

  console.log(JSON.stringify(resp.data,undefined,2));
})
.catch(e=>console.log("ERROR!!",e));
