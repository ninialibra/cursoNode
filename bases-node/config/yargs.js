const opciones = {
  base: {
    demand: true,
    alias: 'b'
  },
  limite: {
    alias: 'l',
    default: 10
  }
}

//definicion de comandos
const argv = require('yargs')
  .command('listar', 'Imprime en consola la tabla de multiplicar', opciones)
  .command('crear', 'Crea el archivo con la tabla de multiplicar', opciones)
  .help()
  .argv;

//exportamos la constante para ser usada en el js donde se ponga este require
module.exports = {
  argv
}
