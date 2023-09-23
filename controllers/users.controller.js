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

  // get whole list of username specified in jwt token
  exports.getUserList = async (req, res) => {
    try {
      const thisUserList = await Lists.find({username:req.username});
      res.send({list:thisUserList[0].todoList});
    } catch (error) {
      console.log(error);
      res.send({message:"Something went wrong while fetching your list"});
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
      const match = await allUsers.find(x => x.username === req.body.username);
      console.log(`match ${match}`);
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

  // add task to list
  exports.addTask = async(req, res, next) => {
    try {
      const user = await Lists.find({username:req.username});
      const list = user[0].todoList;
      list.push(req.body.task);
      const result = await Lists.updateOne({username:req.username}, {todoList:list});
      console.log(result);
      res.send({message:"Task added successfully"});
    } catch (error) {
      console.log(error)
      res.send({message:"Something went wrong"});
    }
  }

  // check to see that the task number inside the request is a number
  // and if the number exists in our list
  exports.checkTaskNr = async(req, res, next) => {
    if (isNaN(Number(req.body.taskNr))) {
      res.status(403).send({message:"Please enter a number in the Task number field!"});
    }else{
      try {
        const user = await Lists.find({username:req.username});
        const list = user[0].todoList;
        if (Number(req.body.taskNr) > list.length) {
          res.send({message:"task number does not exist"})
        }else{
          next();
        }
      } catch (error) {
        
      }
    }
  }

  // removes a specific task
  exports.editTask = async(req, res, next) => {
    try {
      const user = await Lists.find({username:req.username});
      const list = user[0].todoList;
      list[Number(req.body.taskNr)-1] = req.body.task;
      const result = await Lists.updateOne({username:req.username}, {todoList:list});
      console.log(result);
      res.send({message:"Task updated successfully"});
    } catch (error) {
      console.log(error)
      res.send({message:"Something went wrong"});
    }
  }

  // removes a task from the todo list of the user listed in the jwt token
  exports.removeTask = async(req, res) => {
    try {
      const user = await Lists.find({username:req.username});
      const list = user[0].todoList;
      list.splice(Number(req.body.taskNr)-1, 1);
      const result = await Lists.updateOne({username:req.username}, {todoList:list});
      res.send({message:"Task removed successfully"});
    } catch (error) {
      console.log(error)
      res.send({message:"Something went wrong"});
    }
  }