//configuracion de recepcion de parametros
const argv = require('./config/yargs').argv;

//modulo para establecer colores en la consola
const colors = require('colors/safe');

//funciones
const {
  crearArchivo,
  listarTabla
} = require('./multiplicar/multiplicar');

let comando = argv._[0];

//control de comando insertado
switch (comando) {
  case 'listar':
    listarTabla(argv.base, argv.limite);
    break;
  case 'crear':
    crearArchivo(argv.base, argv.limite)
      .then(archivo => console.log(`Archivo creado: ` + colors.green(archivo)))
      .catch(e => console.log(e));
    break;
  default:
    console.log('Comando no reconocido');
}

//para ver los argumentos recibidos
//console.log(process.argv);
