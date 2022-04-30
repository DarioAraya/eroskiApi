//Para retornar los detalles de un error.
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
//exportando express error
module.exports = ExpressError;
