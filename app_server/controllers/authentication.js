/*
|----------------------------------------------
| Setting up authentication controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const User = Mongoose.model('users');

const Joi = require('joi');

/*
|----------------------------------------------
| Following function will create a new user into
| mongodb 
|----------------------------------------------
*/
module.exports.signup = (req, res) => {

};
