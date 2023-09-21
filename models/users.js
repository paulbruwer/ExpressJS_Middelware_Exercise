const mongoose = require("mongoose");

// Schema to define our users collection inside of the todo database
let usersSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
});
// set Schema to model
let Users = mongoose.model("users",usersSchema);
// export
module.exports = Users;