/*
|----------------------------------------------
| setting up user controller backend controlelr
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/
const Joi = require('joi');

const Mongoose = require('mongoose');

const UId = require('uid-safe');

const User = Mongoose.model('users');

const Profile = Mongoose.model('profile');

const Branch = Mongoose.model('branch');


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
| following function will get all users 
|----------------------------------------------
*/
module.exports.showMembers = (req, res) => {
    User
        .find({ accountType: 'customer' })
        .exec((err, customers) => {
            if (err) {
                sendJsonResponse(res, 404, {
                    error: err,
                });
            }
            else {
                sendJsonResponse(res, 200, {
                    members: customers,
                });
            }
        });
};

/*
|----------------------------------------------
| show single member
|----------------------------------------------
*/
module.exports.showMember = (req, res) => {
    const memberInfo = Joi.object().keys({
        memberId: Joi.string().email().required(),
    });

    Joi.validate(req.params, memberInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            User
                .findOne({ email: req.params.memberId })
                .exec((err, user) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!user) {
                        sendJsonResponse(res, 404, {
                            error: `no member found with ${req.params.memberId}`,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            member: user,
                        });
                    }
                });
        }
    });
};

module.exports.showMemberProfile = (req, res) => {
    const memberInfo = Joi.object().keys({
        memberId: Joi.string().email().required(),
    });

    Joi.validate(req.params, memberInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Profile
                .findOne({ whos: req.params.memberId })
                .exec((err, profile) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!profile) {
                        sendJsonResponse(res, 404, {
                            error: `no member found with ${req.params.memberId}`,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            profile: profile,
                        });
                    }
                });
        }
    });
};

module.exports.showMemberBranch = (req, res) => {
    const memberInfo = Joi.object().keys({
        memberId: Joi.string().email().required(),
    });

    Joi.validate(req.params, memberInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Branch
                .findOne({ whos: req.params.memberId })
                .exec((err, branch) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!branch) {
                        sendJsonResponse(res, 404, {
                            error: `no member found with ${req.params.memberId}`,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            branch: branch,
                        });
                    }
                });
        }
    });
};
