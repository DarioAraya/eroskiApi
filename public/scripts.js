

const filter = document.querySelector('#filter');


filter.addEventListener('click',()=>{
 
})




//Ordenar por precio Menor a Mayor
function sortingASC(x){
    const newArray = x.sort((a,b)=>{ if(a.price < b.price){ return 1 }else{
        return -1 } }) 
        console.log(newArray.map((array)=>array.name))
}





function sortingDESC(x){
    const newArray = x.sort((a,b)=>{ if(a.price > b.price){ return 1 }else{
        return -1 } }) 
        console.log(newArray.map((array)=>array.name))
}