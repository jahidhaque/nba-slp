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

const AppMailer = require('../config/appmailer.js');

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
            user.statuses = {};

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

                    // const welcomeMessage = {
                    //     form: process.env.mailuser,
                    //     to: req.body.email,
                    //     subject: `Welcome to NBA-SLP`,
                    //     html: `
                    //         <div style="width:700px; font-style: normal; font-size:14px; margin-left: 20px;">
                    //
                    //             <header id="header" style="margin-bottom: 20px;">
                    //                 <img src="http://188.166.147.189/img/ire.jpg" style="width:700px;">
                    //             </header><br/>
                    //
                    //             <p>Dear ${req.body.firstName} ${req.body.lastName}, </p><br/>
                    //             <p style="color: green">Thank you for registering with the NBA Section on Legal Practice</p>
                    //
                    //             <p>
                    //                 On behalf of the Exco and Council Members I want  to welcome you to the Section. You're joining a Legal
                    //                 community of thousands of lawyers, and we are happy to have you here.
                    //             </p>
                    //
                    //             <p>The Section is currently made up of Fourteen Committees that promote the participation of members of the Nigerian
                    //              Bar Association towards achieving the objectives of the Section. Now that you're a part of our community, we encourage
                    //              you to join any of the Section's committees, details are on our website.
                    //              </p>
                    //
                    //              <p>Our Membership base is growing every day, but our goal has always remained the same regardless of our size, we want
                    //              to have a personal connection with each and every member. If you have any questions regarding your Membership, please
                    //              get in touch with us via our website
                    //              </p>
                    //
                    //             <p>our web site is <a href="http.nba-slp.org">Nba-slp.org</a> </p><br/>
                    //
                    //             <p>So, on behalf of the entire Section on Legal Practice you are welcome!</p><br>
                    //
                    //             <p>Mrs Mia Essien SAN</p>
                    //             <p><b>SECTION CHAIRMAN</b></p><br>
                    //
                    //         </div>
                    //     `,
                    // };

                    sendJsonResponse(res, 200, {
                        token: token,
                    });

                    // AppMailer.verify((err, message) => {
                    //     if (err) {
                    //         sendJsonResponse(res, 404, {
                    //             error: err,
                    //         });
                    //     }
                    //     else {
                    //         AppMailer.sendMail(welcomeMessage, (err, info) => {
                    //             if (err) {
                    //                 console.log(err);
                    //                 sendJsonResponse(res, 404, {
                    //                     error: err,
                    //                 });
                    //             }
                    //             else {
                    //                 sendJsonResponse(res, 200, {
                    //                     token: token,
                    //                 });
                    //             }
                    //         });
                    //     }
                    //
                    // });
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
