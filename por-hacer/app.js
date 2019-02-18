const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
  case "crear":
    let aTarea = porHacer.crear(argv.descripcion);
    console.log(aTarea);
    break;

  case "listar":
    let listado = porHacer.getListado();

    for (let tarea of listado) {
      console.log('========== TAREA =========='.green);
      console.log(tarea.descripcion);
      console.log('Estado: ', (tarea.completado ? "Completado" : "Pendiente"));
      console.log('==========================='.green);
    }

    break;

  case "actualizar":
    let actualizado = porHacer.updateTarea(argv.descripcion, argv.completado);
    console.log(actualizado);
    break;

  case "borrar":
    let borrado = porHacer.borrarTarea(argv.descripcion);
    console.log(borrado);
    break;

  default:
    console.log("Comando no reconocido");
}
