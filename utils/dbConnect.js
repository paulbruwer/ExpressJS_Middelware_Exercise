let mongoose = require('mongoose');

// this function will be called in our server router file to connect to the database
exports.dbConnect =  function() {
    const uri = 'mongodb+srv://paulbruwer56:pLe2OUNk0954GVcj@hyperiondevstudent.lxvprkt.mongodb.net/todo';

    mongoose.Promise = global.Promise;

    mongoose.connect(uri)

    mongoose.connection.on('error', function() {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

    mongoose.connection.once('open', function() {
        console.log("Successfully connected to the database");
    });
};