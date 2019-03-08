//modulo para gestion de ficheros
const fs = require('fs');

//modulo gestion de colores
const colors = require("colors");

//funciones
let listarTabla = (base, limite=10) => {

  console.log("==========================".green);
  console.log(`Tabla del ${base} con límite de ${limite}`.green);
  console.log("==========================".green);

  for (let i=1;i<=limite;i++){
    console.log(`${base} * ${i} = ${base*i}`);
  }

}

let crearArchivo = (base, limite=10) => {
  return new Promise ((resolve, reject) => {

    if(!Number(base)){
      reject('La base indicada no es correcta.');
      return;
    }

    let data = '';

    for (let i=1;i<=limite;i++){
      data += `${base} * ${i} = ${base*i}\n`;
    }

    fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
      if (err){
        reject(err);
      }else {
        resolve(`tabla-${base}.txt`);
      }
    });
  });
}

//exportamos funciones
module.exports = {
  crearArchivo,
  listarTabla
}
