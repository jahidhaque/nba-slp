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

const BankTeller = Mongoose.model('bank_teller');

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

/*
|----------------------------------------------
| following function will update bank teller
| based on give information 
|----------------------------------------------
*/
module.exports.approvedTeller = (req, res) => {
    const tellerInfo = Joi.object().keys({
        whos: Joi.string().email().required(),
        valid: Joi.string().min(4).max(5).regex(/^[a-z]{4,5}$/).required(),
        validTill: Joi.string().required(),
    });

    Joi.validate(req.body, tellerInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            BankTeller
                .findOne({ whos: req.body.whos })
                .exec((err, teller) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!teller) {
                        sendJsonResponse(res, 404, {
                            errro: 'No bank teller found for this user to update',
                        });
                    }
                    else {
                        teller.tellerApproved = req.body.valid;
                        teller.tellerValidTill = req.body.validTill;

                        teller.save(err => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: `Error while saving bank teller, Here is the details ${err}`,
                                });
                            }
                            else {
                                sendJsonResponse(res, 200, {
                                    success: true,
                                });
                            }
                        });
                    }
                });
        }
    });
};


module.exports.filterAction = (req, res) => {
    const filterObject = Joi.object().keys({
        source: Joi.string().required(),
        action: Joi.string().required(),
    });

    Joi.validate(req.params, filterObject, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            if (req.params.source === 'bankteller' && req.params.action === 'paid') {

                
                BankTeller
                    .find({ tellerApproved: true })
                    .exec((err, verifiedUsers) => {
                        if (err) {
                            sendJsonResponse(res, 404, {
                                error: err,
                            });
                        }
                        else if(!verifiedUsers) {
                            sendJsonResponse(res, 404, {
                                error: 'no paid user found!',
                            });
                        }
                        else {
                            sendJsonResponse(res, 200, {
                                verifiedUsers: verifiedUsers,
                            });
                        }
                    });
            }
            else if (req.params.source === 'bankteller' && req.params.action === 'unpaid') {
                BankTeller
                    .find({ tellerApproved: false })
                    .exec((err, verifiedUsers) => {
                        if (err) {
                            sendJsonResponse(res, 404, {
                                error: err,
                            });
                        }
                        else if(!verifiedUsers) {
                            sendJsonResponse(res, 404, {
                                error: 'no unpaid user found!',
                            });
                        }
                        else {
                            sendJsonResponse(res, 200, {
                                verifiedUsers: verifiedUsers,
                            });
                        }
                    });

            }
        }
    });
};


/*
|----------------------------------------------
| Following function will search user based
| on given query.
|----------------------------------------------
*/

module.exports.SearchUser = (req, res) => {
    const query = Joi.object().keys({
        query: Joi.string().min(3).required(),
    });

    Joi.validate(req.params, query, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            User
                .find({ $or: [{'email': req.params.query}, 
                    {'displayName': req.params.query}, {'firstName': req.params.query},
                    {'lastName': req.params.query}
                    ] })
                .exec((err, users) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else  if (!users) {
                        sendJsonResponse(res, 404, {
                            error: 'No user found',
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            searchResult: users,
                        });
                    }
                })
        }
    })
}

