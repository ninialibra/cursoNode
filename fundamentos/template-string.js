let nombre = 'Taniuska';
let real = 'Tania';

console.log(nombre + ' ' + real);
console.log(`${nombre} ${real}`);

function getNombre() {
  return `${nombre} ${real}`;
}

console.log(`El nombre es: ${getNombre()}`);
