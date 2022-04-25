const productFather = document.querySelector("#productFather");
var type = "";
//PRODUCTOs
const todosProd = async () => {
  try {
    const res = await axios.get("https://localhost:4000/all-products");
    for (const arr of res.data.products) {
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
        document
          .querySelector(`#div${arr.id}-3`)
          .append(
            nuevaImg(`${arr.url_image}`, "rounded", "160", "160", "img1")
          );
      } else {
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
      document.querySelector(`#div${arr.id}-3`).append(nuevoH5(`${arr.name}`));
      //ESTO SIRVE PARA VER LA CATEGORIA DEL ULTIMO ELEMENTO
      //var type = `${arr.category}`;
      //FIN
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
        document.querySelector(`#span${arr.id}-3`).append(` -${arr.discount}%`);
      } else {
        document
          .querySelector(`#div${arr.id}-4`)
          .append(nuevoSpan(`span${arr.id}-4`, ""));
        document.querySelector(`#span${arr.id}-4`).append(`${price3}`);
      }
      //FIN
      document
        .querySelector(`#div${arr.id}-2`)
        .append(
          nuevoDiv(
            "p-3 product text-center text-white mt-3 cursor",
            `div${arr.id}-5`
          )
        );
      type = arr.category;
      document
        .querySelector(`#div${arr.id}-5`)
        .append(nuevoSpan(`span${arr.id}-5`, "text-uppercase"));
      document.querySelector(`#span${arr.id}-5`).append("Add to cart");
    }
  } catch (e) {
    console.log("ERROR", e);
  }
};
//FIN

//CREACION DE ELEMENTOS HTML
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
//fin

//EJECUTAR SCRIPT AL INICIAR LA PAGINA.
todosProd();
