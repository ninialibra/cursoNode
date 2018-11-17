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

let getEmpleado = (id, callback) => {
  let empleadoDB = empleados.find(empleado => empleado.id===id )

  if(!empleadoDB){
    callback(`No existe un empleado con el ID ${id}`)
  }else{
    callback(null, empleadoDB);
  }
}

let getSalario = (empleado, callback) => {
  let salarioDB = salarios.find(salario => salario.id===empleado.id)

  if(!salarioDB){
    callback(`No se encontró un salario para el empleado ${empleado.nombre}`)
  }else{

    callback(null, {
      nombre: empleado.nombre,
      salario: salarioDB.importe
    });
  }
}

getEmpleado(3, (error, empleado)=>{

  if(error){
      return console.log(error);
  }

  getSalario(empleado, (error, salario)=>{

    if(error){
        return console.log(error);
    }

    console.log(salario);
  });
});
