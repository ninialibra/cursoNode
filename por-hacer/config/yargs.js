const argv = require('yargs')
  .command('crear', 'Crear tarea', {
    descripcion: {
      demand: true,
      alias: 'd',
      desc: "Descripción de la tarea a realizar"
    }
  })
  .command('actualizar', 'Actualiza una tarea', {
    descripcion: {
      demand: true,
      alias: 'd'
    },
    completado: {
      alias: 'c',
      default: true,
      desc: "Marca la tarea como pendiente o completada"
    }
  })
  .help()
  .argv;

module.exports = {
  argv
}
