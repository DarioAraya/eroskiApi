//llamando al div padre en el que iran las categorias
const sidebar = document.querySelector("#sidebar");
//Funcion que realiza una consulta a la ruta all products con el objetivo de traer la variable categories y poder recorrerla
const allSidebar = async () => {
  try {
    const res = await axios.get(
      "https://eroski-api-backend.herokuapp.com/all-products"
    );
    for (let arr of res.data.categories) {
      sidebar.append(
        nuevoA(`/filter?id=${arr.id}`, `d-block text-light p-3`, `a-${arr.id}`)
      );
      document
        .querySelector(`#a-${arr.id}`)
        .append(`${arr.name[0].toUpperCase()}${arr.name.slice(1)}`);
    }
  } catch (e) {
    console.log("ERROR", e);
  }
};
//FIN

//Funcion que permite generar enlaces
const nuevoA = (href, clase, id) => {
  const a = document.createElement("A");
  a.setAttribute("href", href);
  a.setAttribute("class", clase);
  a.setAttribute("id", id);
  return a;
};

//llamando a la funcion cada vez que se ejecuta la pagina
allSidebar();
