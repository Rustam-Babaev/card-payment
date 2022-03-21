const bcrypt = require("bcryptjs");
const Payment = require("../models/payment");
const ValidationError = require("../errors/validation-err");
const ConflictError = require("../errors/conflict-errors");
const { notCorrectPaymentMessage } = require("../constants/constants");

const createPayment = (req, res, next) => {
  const { CardNumber, ExpDate, Cvv, Amount } = req.body;
  bcrypt
    .hash(String(CardNumber), 10)
    .then((hash) =>
      Payment.create({
        CardNumber,
        ExpDate,
        Amount,
        Cvv,
        RequestId: hash,
      })
    )
    .then((payment) => {
      res.send({ RequestId: payment.RequestId, Amount: payment.Amount });
    })
    .catch((err) => {
      let customError = err;
      if (err.name === "ValidationError") {
        customError = new ValidationError(notCorrectPaymentMessage);
      }
      next(customError);
    });
};

module.exports = {
  createPayment,
};
