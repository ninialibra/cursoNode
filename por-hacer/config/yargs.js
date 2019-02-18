const descripcion = {
  demand: true,
  alias: 'd',
  desc: "Descripción de la tarea a realizar"
};

const completado = {
  alias: 'c',
  default: true,
  desc: "Marca la tarea como pendiente o completada"
};

const argv = require('yargs')
  .command('crear', 'Crear tarea', {
    descripcion
  })
  .command('actualizar', 'Actualiza una tarea', {
    descripcion,
    completado
  })
  .command('borrar', 'Borrar tarea', {
    descripcion
  })
  .help()
  .argv;

module.exports = {
  argv
}
