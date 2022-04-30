//generando la plantilla de error
const error = document.querySelector("#errorDiv");
const h4 = document.createElement("H4");
h4.setAttribute("class", `alert-heading`);
h4.innerText = "Oh No, Something Went Wrong!";
error.append(h4);
const p = document.createElement("P");
p.innerText = "404 (Not Found)";
error.append(p);
const a = document.createElement("A");
a.setAttribute("href", "/");
a.append("Volver a la pagina principal");
error.append(a);
