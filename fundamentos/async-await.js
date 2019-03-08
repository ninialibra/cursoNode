let getNombre = async() => {
  //throw new Error("No existe un nombre para ese usuario");
  return 'Tania';
};

getNombre().then(nombre => {
    console.log(nombre);
  })
  .catch(e => {
    console.log('Error de ASYNC', e);
  })


let getNombre2 = () => {
  return new Promise((resolve, reject) => {

    setTimeout(()=> {
      resolve ('Tania');
    }, 3000);
  })
}

//las funciones donde se use await siempre tienen que ser async.
let saludo = async () => {

  //se para todo hasta recibir la respuesta de getNombre2
  let nombre = await getNombre2();

  return `Hola ${nombre}`;
}

saludo().then(mensaje=> {
  console.log(mensaje);
})
