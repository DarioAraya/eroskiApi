/*Retorna una funcion que tiene como parametro a otra funcion, esto para 
realizar un next en caso de que falle una ruta o haya un error y no se caiga la pagina*/

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
