//JAVASCRIPT PARA BUSCAR POR NOMBRE

//Este parametro se utiliza para recibir los parametros del header y de esta forma usarlo en la consulta axios
const params = (parameterName) => {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
};
//llamando al div padre en donde iran los productos ordenados
const productFather = document.querySelector("#productFather");
//capturando el parametro name en el header
const nameQuery = params("name");
//capturando el parametro id en el header
const idQuery = params("id");
//inicializo esta variable en todos los archivos js que tengan que ver con traer los productos
//explico su funcion en scripts.js
var type = "";
//creando la funcion para buscar por nombre
const buscar = async () => {
  try {
    const res = await axios.post(
      //se realiza una peticion post a la api en la direccion find-for-name enviando como parametros body el name y el id
      "https://eroski-api-backend.herokuapp.com/find-for-name",
      {
        name: nameQuery,
        id: idQuery,
      }
    );
    //validar si el array de productos esta vacio
    if (res.data.products.length > 0) {
      //recorriendo el array productos y generando los append por cada producto
      for (const arr of res.data.products) {
        //llamando al div padre que se encuentra en el html luego es solo ir generando los div para su correcta visualizacion e ir añadiendo sus correspondientes variables
        productFather.append(nuevoDiv("col-md-4", `div${arr.id}`));
        document
          .querySelector(`#div${arr.id}`)
          .append(nuevoDiv("card mt-3", `div${arr.id}-2`));
        document
          .querySelector(`#div${arr.id}-2`)
          .append(
            nuevoDiv(
              "product-1 aling-items-center p-2 text-center",
              `div${arr.id}-3`
            )
          );
        if (arr.url_image) {
          //comprobando si el producto cuenta con una imagen
          document
            .querySelector(`#div${arr.id}-3`)
            .append(
              nuevaImg(`${arr.url_image}`, "rounded", "160", "160", "img1")
            );
        } else {
          //si no la tiene se le asigna una imagen para que no deforme la pagina
          document
            .querySelector(`#div${arr.id}-3`)
            .append(
              nuevaImg(
                "https://www.yeaah.co/wp-content/uploads/2021/08/producto-sin-imagen.jpg",
                "rounded",
                "160",
                "160",
                "img2"
              )
            );
        }
        document
          .querySelector(`#div${arr.id}-3`)
          .append(nuevoH5(`${arr.name}`));
        document
          .querySelector(`#div${arr.id}-3`)
          .append(nuevoDiv("cost mt-3", `div${arr.id}-4`));
        //ESTO SIRVE PARA PONERLE EL PUNTO AL PRECIO
        let price = Math.round(arr.price - (arr.price * arr.discount) / 100);
        let price2 = new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(price);
        let price3 = new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(arr.price);
        if (arr.discount > 0) {
          document
            .querySelector(`#div${arr.id}-4`)
            .append(nuevoSpan(`span${arr.id}-1`, ""));
          document.querySelector(`#span${arr.id}-1`).append(`${price2} `);
          document
            .querySelector(`#div${arr.id}-4`)
            .append(nuevoSpan(`span${arr.id}-2`, ""));
          document
            .querySelector(`#span${arr.id}-2`)
            .append(nuevoDel(`del${arr.id}-1`));
          document.querySelector(`#del${arr.id}-1`).append(`${price3}`);
          document
            .querySelector(`#span${arr.id}-2`)
            .append(nuevoSpan(`span${arr.id}-3`, ""));
          document
            .querySelector(`#span${arr.id}-3`)
            .append(` -${arr.discount}%`);
        } else {
          document
            .querySelector(`#div${arr.id}-4`)
            .append(nuevoSpan(`span${arr.id}-4`, ""));
          document.querySelector(`#span${arr.id}-4`).append(`${price3}`);
        }
        //Asignando a la variable type el id categoria que tiene el ultimo producto generado
        type = arr.category;
        document
          .querySelector(`#div${arr.id}-2`)
          .append(
            nuevoDiv(
              "p-3 product text-center text-white mt-3 cursor",
              `div${arr.id}-5`
            )
          );
        document
          .querySelector(`#div${arr.id}-5`)
          .append(nuevoSpan(`span${arr.id}-5`, "text-uppercase"));
        document.querySelector(`#span${arr.id}-5`).append("Add to cart");
      }
    } else {
      //en caso de que el array productos este vacio se generara un h5 con el siguiente texto
      productFather.append(nuevoH5("No se encontraron elementos..."));
    }
  } catch (e) {
    //mostrando en consola cualquier error que se produsca con respecto a la peticion axios
    console.log("ERROR", e);
  }
};

//Funciones para la creacion de objetos html. Esto con el objetivo de facilitar la escritura de arriba, tambien lo hace mas facil de entender.
const nuevoDiv = (clase, id) => {
  const div = document.createElement("DIV");
  div.setAttribute("class", clase);
  div.setAttribute("id", id);
  return div;
};

const nuevaImg = (src, clase, height, width, id) => {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("class", clase);
  img.setAttribute("height", height);
  img.setAttribute("width", width);
  img.setAttribute("id", id);
  return img;
};

const nuevoH5 = (nombre) => {
  const h5 = document.createElement("H5");
  h5.innerText = nombre;
  return h5;
};

const nuevoSpan = (id, clase) => {
  const span = document.createElement("SPAN");
  span.setAttribute("id", id);
  span.setAttribute("class", clase);
  return span;
};

const nuevoDel = (id) => {
  const del = document.createElement("DEL");
  del.setAttribute("id", id);
  return del;
};

//SE EJECUTA SCRIPT AL INICIAR LA PAGINA.
buscar();
