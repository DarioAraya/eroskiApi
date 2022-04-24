const filter = document.querySelector("#filter");
const filter2 = document.querySelector("#filter2");
const filter3 = document.querySelector("#filter3");
const filter4 = document.querySelector("#filter4");
const filter5 = document.querySelector("#filter5");

filter.addEventListener("click", () => {
  filter.href += `&id=${type}`;
  console.log(type);
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
