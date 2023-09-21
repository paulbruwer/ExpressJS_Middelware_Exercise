var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const { checkJWTToken, changePasswordVerification } = require("./middelware");
const { getUserList } = require("../controllers/users.controller");

/* GET users listing. */
router.get("/", checkJWTToken, getUserList);


// change password route
router.put(
  "/changePassword",
  checkJWTToken,
  changePasswordVerification,
  function (req, res) {
    userInformation.password = req.newUserPassword;
    res.send({
      message: "Password Successfully changed",
      newPassword: userInformation.password,
    });
  }
);

module.exports = router;
