const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
  case "crear":
    let aTarea = porHacer.crear(argv.descripcion);
    console.log(aTarea);
    break;
  case "listar":
    console.log("Mostrar todas las tareas por hacer");
    break;
  case "actualizar":
    console.log("Actualizar tarea");
    break;
  default:
    console.log("Comando no reconocido");
}
