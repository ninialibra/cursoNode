let empleados = [{
    id: 1,
    nombre: "Tania"
},{
    id: 2,
    nombre: "Marta"
},{
    id: 3,
    nombre: "Jorge"
}];

let salarios = [{
    id: 1,
    importe: "1000"
},{
    id: 2,
    importe: "900"
}];

let getEmpleado = async (id) => {

  let empleadoDB = empleados.find(empleado => empleado.id===id )

  if(!empleadoDB){
    throw new Error (`No existe un empleado con el ID ${id}`)
  }else{
    return empleadoDB;
  }

}

let getSalario = async (empleado) => {

  let salarioDB = salarios.find(salario => salario.id===empleado.id)

  if(!salarioDB){
    throw new Error (`No se encontró un salario para el empleado ${empleado.nombre}`)
  }else{

    return {
      nombre: empleado.nombre,
      salario: salarioDB.importe
    };
  }

}

let getInformacion = async (id) => {
  let empleado = await getEmpleado(id);
  let salario = await getSalario(empleado);

  return `${empleado.nombre} tiene un salario de ${salario.salario}`;
}

getInformacion(3)
  .then(mensaje=>console.log(mensaje))
  .catch(error=>console.log(error))
