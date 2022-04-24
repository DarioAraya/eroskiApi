const sidebar = document.querySelector("#sidebar");
//SIDEBAR
const allSidebar = async () => {
  try {
    const res = await axios.get("http://localhost:4000/all-products");
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
const nuevoA = (href, clase, id) => {
  const a = document.createElement("A");
  a.setAttribute("href", href);
  a.setAttribute("class", clase);
  a.setAttribute("id", id);
  return a;
};

allSidebar();
