const mongoose = require("mongoose");

// Schema to define our list collection inside of the todo database
let listSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    todoList: {
        type: Array,
        required:true
    }
});
// set Schema to model
let Lists = mongoose.model("Lists",listSchema);
// export
module.exports = Lists;