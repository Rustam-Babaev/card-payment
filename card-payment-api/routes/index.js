const router = require("express").Router();
const routerPayments = require("./payments");
const { notCorrectLinkMessage } = require("../constants/constants");

router.use("/payments", routerPayments);
router.use("/", (req, res, next) => {
  const customError = new Error(notCorrectLinkMessage);
  customError.statusCode = 404;
  next(customError);
});

module.exports = router;
