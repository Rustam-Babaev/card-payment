const { serverErrorMessage } = require("../constants/constants");

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = serverErrorMessage } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? serverErrorMessage : message,
  });
  next();
};
