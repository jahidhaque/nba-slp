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

const Passport = require('passport');

const UId = require('uid-safe');

/*
|----------------------------------------------------------------
| function for returning json.
|----------------------------------------------------------------
*/
const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

/*
|----------------------------------------------
| Following function will create a new user into
| mongodb 
|----------------------------------------------
*/
module.exports.signup = (req, res) => {
    const user = Joi.object().keys({
        firstName: Joi.string().min(3).max(24).regex(/^[a-zA-Z ]{3,24}/),
        lastName: Joi.string().min(3).max(24).regex(/^[a-zA-Z ]{3,24}/),
        displayName: Joi.string().min(3).max(24).regex(/^[a-zA-Z ]{3,24}/),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(24),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });

    Joi.validate(req.body, user, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
            return;
        }
        else {
            // Create user object to generate collection.
            const user = new User();
            const userId = UId.sync(10);
            user.userId = userId;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.displayName = req.body.displayName;
            user.email = req.body.email;
            user.password = user.setPassword(req.body.password);

            user.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        sendJsonResponse(res, 404, {
                            error: 'This email address has been taken.',
                        });
                    }
                    else {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                }
                else {
                    const token = user.generateJwt();
                    sendJsonResponse(res, 200, {
                        token: token,
                    });
                }
            });
        }
    });
};

/*
|----------------------------------------------
| Following function will allow user to login
|----------------------------------------------
*/
module.exports.signin = function (req, res) {
    // checking input.
    if(!req.body.email || !req.body.password)   {
        sendJsonResponse(res, 400, {
            message: 'All fields required. Must not be empty',
        });
    }
    else {

        // using passport.
        Passport.authenticate('local', function (err, User, info) {

            if (err) {
                sendJsonResponse(res, 404, err);
            }
            else if (User) {                
                const token = User.generateJwt();
                sendJsonResponse(res, 200, {
                    token: token,
                });
            }
            else {
                sendJsonResponse(res, 404, info);
            }

        })(req, res);
    }
};

