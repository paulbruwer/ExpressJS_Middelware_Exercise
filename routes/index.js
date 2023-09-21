var express = require('express');
var router = express.Router();
const { getUserDetails, setNewUser, createList, userExists } = require("../controllers/users.controller");
const { dbConnect } = require("../utils/dbConnect");
const { loginUser, checkUserName } = require('./middelware');

dbConnect()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// verifies user and returns jwt token
router.post("/login",getUserDetails , loginUser);

// creates new user and list data
router.post("/register", checkUserName, userExists, setNewUser, createList);

module.exports = router;
