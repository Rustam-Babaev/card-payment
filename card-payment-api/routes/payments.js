const router = require("express").Router();
const { createPayment } = require("../controllers/payments");
const { paymentsValidator } = require("../validation/payments-valitation");

router.post("/", paymentsValidator, createPayment);

module.exports = router;
