var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const { changePasswordVerification, checkTaskLength } = require("./middelware");
const { getUserList, addTask, checkTaskNr, editTask, removeTask } = require("../controllers/users.controller");

/* GET users listing. */
router.get("/", getUserList);
// add task
router.post("/add", checkTaskLength, addTask);
// edit task
router.post("/edit", checkTaskNr, checkTaskLength, editTask);
// remove task
router.delete("/delete", checkTaskNr, removeTask)


// change password route
router.put(
  "/changePassword",
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
