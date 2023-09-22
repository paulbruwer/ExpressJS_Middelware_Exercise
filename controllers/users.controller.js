const Users = require("../models/users");
const Lists = require("../models/Lists");

// note body parser is being used in app.js

  // gets document of specified user and set to header
  exports.getUserDetails = async (req, res, next) => {
    try {
        const result = await Users.find({username:req.body.username});
        req.savedPassword = result[0].password;
        next()
    } catch (error) {
        console.log(error);
    }
  }

  exports.getUserList = async (req, res) => {
    try {
      const thisUserList = await Lists.find({username:req.username});
      res.send(thisUserList[0].todoList);
    } catch (error) {
      console.log(error);
    }
  }

  // pushes a new user document to users collection
  exports.setNewUser = async (req, res, next) => {
    const newUser = new Users({
      username: req.body.username,
      password: req.body.password
    })
    try {
      await newUser.save();
      next();
    } catch (error) {
      console.log(error);
      res.send({message:"something went wrong"})
    }
  }

  // pushes a new list document to lists collection upon creating new user
  exports.createList = async (req, res) => {
    const newList = new Lists({
      username: req.body.username,
      todoList: []
    });
    try {
      const result = await newList.save();
      console.log(result);
      res.send({message:"New user added"});
    } catch (error) {
      console.log(error)
      res.send({message:"Failed to add user"})
    }
  }

  // check to see if username already exists when creating new user
  exports.userExists = async(req, res, next) => {
    try {
      const allUsers = await Users.find({});
      const match = await allUsers.find(x => x.username === req.body.username).username;
      if (match === undefined) {
        next()
      }else{
        res.status(403).send({message:"Username in use"});
      }
    } catch (error) {
      console.log(error);
      res.send({message:"Something went wrong"})
    }
  }