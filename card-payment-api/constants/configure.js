const {
  DATA_PAYMENTS = "mongodb://localhost:27017/paymentdb",
  PORT = 3001,
  NODE_ENV = "development",
} = process.env;

module.exports = {
  DATA_PAYMENTS,
  PORT,
  NODE_ENV,
};
