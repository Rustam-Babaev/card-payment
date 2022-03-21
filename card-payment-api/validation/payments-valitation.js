const { celebrate, Joi } = require("celebrate");
const notCorrectLinkMessage = require("../constants/constants");

const validateDate = (value) => {
  if (value.length === 7 && value.match("/")) {
    const date = value.split("/");
    const month = Number(date[0]);
    const year = Number(date[1]);
    if (year > 2021 && year < 2050 && month < 13 && month > 0) {
      return value;
    }
  }
  throw new Error(notCorrectLinkMessage);
};

const paymentsValidator = celebrate({
  body: Joi.object().keys({
    CardNumber: Joi.number().required().integer(),
    ExpDate: Joi.string()
      .required()
      .custom(validateDate, "custom validation for date"),
    Cvv: Joi.number().required().integer(),
    Amount: Joi.number().required().min(1),
  }),
});

module.exports = {
  paymentsValidator,
};
