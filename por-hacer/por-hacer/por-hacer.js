const fs = require('fs');

let listadoTareas = [];

const guardarDB = () => {

    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoTareas);

        fs.writeFile(`db/data.json`, data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(`Tarea guardada en la BD`);
          }
        });
      }
    }

    const crear = (descripcion) => {
      let tarea = {
        descripcion,
        completado: false
      }

      listadoTareas.push(tarea);

      return tarea;
    }

    module.exports = {
      crear
    }
