const mongoose = require("mongoose");
const validator = require("validator");
const { notCorrectPaymentMessage } = require("../constants/constants");

const paymentSchema = new mongoose.Schema({
  CardNumber: {
    type: Number,
    trim: true,
    required: true,
    select: false,
    validate: {
      validator(cardNumber) {
        return String(cardNumber).split("").length === 16;
      },
      message: (props) => `${props.value} ${notCorrectPaymentMessage}`,
    },
  },
  ExpDate: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  Cvv: {
    type: Number,
    trim: true,
    required: true,
    select: false,
    validate: {
      validator(Cvv) {
        return String(Cvv).split("").length === 3;
      },
      message: (props) => `${props.value} ${notCorrectPaymentMessage}`,
    },
  },
  Amount: {
    type: Number,
    trim: true,
    required: true,
    minLength: 1,
  },
  RequestId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
