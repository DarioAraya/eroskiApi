//SCRIPT PARA FILTRAR
//llamando a los elementos con id filter en el ordenar por
const filter = document.querySelector("#filter");
const filter2 = document.querySelector("#filter2");
const filter3 = document.querySelector("#filter3");
const filter4 = document.querySelector("#filter4");
const filter5 = document.querySelector("#filter5");

/*al realizar un click en uno de estos botones se concatena el id con el valor type, el cual se declara en los scripts sort,search,filter,all-products, de esta forma ademas de enviar el
valor sortBy enviamos el id de la categoria al header para poder ordenar manteniendonos en la misma categoria*/
filter.addEventListener("click", () => {
  filter.href += `&id=${type}`;
});
filter2.addEventListener("click", () => {
  filter2.href += `&id=${type}`;
});
filter3.addEventListener("click", () => {
  filter3.href += `&id=${type}`;
});
filter4.addEventListener("click", () => {
  filter4.href += `&id=${type}`;
});
filter5.addEventListener("click", () => {
  filter5.href += `?sortBy=null&id=${type}`;
});

/*Al realizar click en el boton buscar le añadimos a un input oculto la variable type, 
esto con el mismo objetivo del que lo hicimos en el script de arriba, para enviar al 
header la variable name y la varibale id de la categoria. De esta forma buscamos por 
nombre un producto manteniendonos en la misma categoria.*/
const inputBuscarName = document.querySelector("#inputName");
const inputBuscarId = document.querySelector("#inputIdHidden");
inputBuscarName.addEventListener("click", () => {
  inputBuscarId.value = `${type}`;
});
