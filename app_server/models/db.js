
const mongoose = require('mongoose');

let gracefulShutdown;
mongoose.Promise = global.Promise;
const dbURI = 'mongodb://localhost/nbaslp';
mongoose.connect(dbURI, {
    useMongoClient: true,
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

/*
|----------------------------------------------
| Here we are registering each and every schema
| with mongoose.
|----------------------------------------------
*/
require('./users');
require('./profile');
require('./securitycode');
require('./branch');
require('./committee');
require('./bankteller');
require('./events');
require('./message');
require('./council');

