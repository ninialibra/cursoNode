/*function sumar(a,b){
  return a+b;
}*/

/*let sumar = (a,b)=>{
  return a+b;
}*/

//ejemplo anterior con otra sintaxis para casos en los que la funcion es de una sola linea
let sumar = (a,b)=>a+b;

console.log(sumar(10,20));

/*function saludar(){
  return "Hola mundo";
}*/

//traducción de la funcion anterior a funcion de flecha
let saludar = ()=>"Hola mundo";
console.log(saludar());

let persona = {
  nombre: "Tania",
  apellido: "MG",
  oficio: "Programadora Senior",
  getNombre() {
    return `${this.nombre} ${this.apellido} - Oficio: ${this.oficio}`;
  }
};

console.log(persona.getNombre());
