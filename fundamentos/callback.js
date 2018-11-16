/*setTimeout(()=>{
  console.log("Hola mundo");
},3000);*/

let getUsuarioById = (id, callback) => {
  let usuario = {
    nombre: "Tania",
    id //en casos en los que la propiedad es igual a la variable se puede dejar así en vez de id: id
  }

  //simular error
  if(id===20){
    callback(`El usuario con id ${id} no existe en la BD`);
  }else{
    callback(null, usuario);
  }

};

getUsuarioById(10, (error, usuario)=>{

  if(error){
    return console.log(error);
  }

  console.log("Usuario de BD", usuario);
});
