let persona = {
  nombre: "Tania",
  apellido: "MG",
  oficio: "Programadora Senior",
  getNombre: function(){
    return `${this.nombre} ${this.apellido} - Oficio: ${this.oficio}`;
  }
};

console.log(persona.getNombre());

let {nombre: primerNombre, apellido, oficio} = persona;

console.log(primerNombre, apellido, oficio);
