const axios = require("axios");

const getClima = async(latitud, longitud) =>{

  let respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=f369635965b00ad16ced5da4da4b9f3b`);

  if(respuesta.data.code!==undefined){
    throw new Error (`No hay resultados para las coordenadas ${latitud}, ${longitud}`);
  }

  return respuesta.data.main.temp;  
}

module.exports = {
  getClima
}
