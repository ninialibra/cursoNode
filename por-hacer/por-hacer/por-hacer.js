const fs = require('fs');

let listadoTareas = [];

const guardarDB = () => {

  let data = JSON.stringify(listadoTareas);

  fs.writeFile(`db/data.json`, data, (error) => {
    if (error) throw new Error("No se pudo grabar la tarea", error);
  });
}

const cargarDB = () => {

  try {
    //al hacer un require de un json automáticamente se guarda como objeto en la variable
    listadoTareas = require("../db/data.json");
  } catch (error) {
    listadoTareas = [];
  }

}

const getListado = () => {

  cargarDB();

  return listadoTareas;

}

const crear = (descripcion) => {

  cargarDB();

  let tarea = {
    descripcion,
    completado: false
  }

  listadoTareas.push(tarea);

  guardarDB();

  return tarea;
}

const updateTarea = (descripcion, completada=true) => {

  cargarDB();

  let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

  if(index>=0){
    listadoTareas[index].completado = completada;
    guardarDB();

    return true;
  }else{
    return false;
  }

}

const borrarTarea = (descripcion) => {

  cargarDB();

  let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

  if(index>=0){

    listadoTareas.splice( index, 1 );

    guardarDB();

    return true;
  }else{
    return false;
  }
}

module.exports = {
  crear,
  getListado,
  updateTarea,
  borrarTarea
}
