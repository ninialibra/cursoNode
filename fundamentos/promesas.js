let empleados = [{
    id: 1,
    nombre: 'Tania'
},{
    id: 2,
    nombre: 'Marta'
},{
    id: 3,
    nombre: 'Jorge'
}];

let salarios = [{
    id: 1,
    importe: '1000'
},{
    id: 2,
    importe: '900'
}];

let getEmpleado = (id) => {

  return new Promise((resolve, reject)=> {

    let empleadoDB = empleados.find(empleado => empleado.id === id)

    if (!empleadoDB) {
      reject(`No existe un empleado con el ID ${id}`)
    } else {
      resolve(empleadoDB);
    }

  });
}

let getSalario = (empleado) => {

  return new Promise((resolve, reject)=> {

    let salarioDB = salarios.find(salario => salario.id === empleado.id)

    if (!salarioDB) {
      reject(`No se encontró un salario para el empleado ${empleado.nombre}`)
    } else {

      resolve({
        nombre: empleado.nombre,
        salario: salarioDB.importe
      });
    }
  });
}

/*getEmpleado(3).then(empleado=>{
  console.log('Empleado de BD', empleado);

  getSalario(empleado).then(salario=>{
    console.log(salario);

  }, (error)=> console.log(error) )

}, (error)=> console.log(error) );*/

//ejemplo anterior con promesas encadenadas
getEmpleado(3).then(empleado=> {

    return getSalario(empleado);

  })
  .then(salario=> {
    console.log(salario);
  })
  .catch(error=> {
    console.log(error);
  });
