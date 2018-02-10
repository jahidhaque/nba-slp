/*
|----------------------------------------------
| setting up account controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

require('dotenv').config();

const Mongoose = require('mongoose');

const Profile = Mongoose.model('profile');

const Users = Mongoose.model('users');

const Branch = Mongoose.model('branch');

const BankTeller = Mongoose.model('bank_teller');

const AppMailer = require('../config/appmailer.js');

const Multer = require('multer');

const Fs = require('fs');

const SecurityCode = Mongoose.model('securityCode');

const Joi = require('joi');

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
| userId joi validation
|----------------------------------------------
*/
const userId = Joi.object().keys({
    userId: Joi.string().email().required(),
});


/*
|----------------------------------------------
| Following function will reset user given password
|----------------------------------------------
*/
module.exports.resetPassword = (req, res) => {
    const resetInfo = Joi.object().keys({
        password: Joi.string().min(5).max(50).required(),
        repeat_password: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        new_password: Joi.string().min(5).max(50).required(),        
    });

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Joi.validate(req.body, resetInfo, (err, value) => {
                if (err) {
                    sendJsonResponse(res, 404, {
                        error: err.details[0].message,
                    });
                }
                else {
                    Users
                        .findOne({ email: req.params.userId })
                        .exec((err, user) => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: err,
                                });
                            }
                            else if (!user) {
                                sendJsonResponse(res, 404, {
                                    error: "No user found with given id",
                                });
                            }
                            else {
                                user.password = user.setPassword(req.body.new_password);

                                user.save(err => {
                                    if (err) {
                                        sendJsonResponse(res, 404, {
                                            error: 'Error while changing password. Please contact admin',
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
        }
    });
};

/*
|----------------------------------------------
| Following function will generate security code
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nbaslp, 2018
|----------------------------------------------
*/
module.exports.generateSecurityCode = (req, res) => {

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            SecurityCode
                .findOne({ codeHolder: req.params.userId })
                .exec((err, code) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!code) {
                        const key = UId.sync(5);

                        const Code = new SecurityCode();

                        Code.codeId = UId.sync(10);
                        Code.securityCode = key;
                        Code.encryptCode = Code.setCode(key);
                        Code.codeHolder = req.params.userId;

                        Code.save((err) => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: err,
                                });
                            }
                            else {
                                
                                const Message = {
                                    form: process.env.mailuser,
                                    to: req.params.userId,
                                    subject: `Nba-SLP Account Validation Code`,
                                    html: `<p> You have recent request for security code. Please use the following code to 
                                    validate your account. This code will be valid for next <strong>8 hours</strong>.
                                    <br/> Your security code is <br/>
                                    <strong><pre>${key}</pre></strong>
                                    </p>`,
                                };

                                AppMailer.verify((err, message) => {
                                    if (err) {
                                        sendJsonResponse(res, 404, {
                                            error: err,
                                        });
                                    }
                                    else {
                                        AppMailer.sendMail(Message, (err, info) => {
                                            if (err) {
                                                sendJsonResponse(res, 404, {
                                                    error: err,
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
                    }
                    else {
                        const newKey = UId.sync(5);
                        code.securityCode = newKey;
                        code.encryptCode = code.setCode(newKey);

                        code.save((err) => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: err,
                                });
                            }
                            else {
                                const Message = {
                                    form: process.env.mailuser,
                                    to: req.params.userId,
                                    subject: `Nba-SLP Account Validation Code`,
                                    html: `<p> You have recent request for security code. Please use the following code to 
                                    validate your account. This code will be valid for next <strong>8 hours</strong>.
                                    <br/> Your security code is <br/>
                                    <strong><pre>${newKey}</pre></strong>
                                    </p>`,
                                };

                                // send email
                                AppMailer.verify((err, message) => {
                                    if (err) {
                                        sendJsonResponse(res, 404, {
                                            error: err,
                                        });
                                    }
                                    else {
                                        AppMailer.sendMail(Message, (err, info) => {
                                            if (err) {
                                                sendJsonResponse(res, 404, {
                                                    error: err,
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
                    }
                });
        }
    });
};


/*
|----------------------------------------------
| Following function will validate given security
| code
|----------------------------------------------
*/
module.exports.validateCode = (req, res) => {
    const validateObject = Joi.object().keys({
        userId: Joi.string().email().required(),
        code: Joi.string().required(),
    });

    Joi.validate(req.params, validateObject, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            SecurityCode
                .findOne({ codeHolder: req.params.userId })
                .exec((err, code) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!code) {
                        sendJsonResponse(res, 404, {
                            error: 'No security code generated for You. Please contact admin',
                        });
                    }
                    else if (!code.validateCode(req.params.code)) {
                        sendJsonResponse(res, 404, {
                            error: 'Invalid code!',
                        });
                    }
                    else {
                        
                        Users
                            .findOne({ email: req.params.userId })
                            .select('validationStatus')
                            .exec((err, user) => {
                                if (err) {
                                    sendJsonResponse(res, 404, {
                                        error: err,
                                    });
                                }
                                else if (!user) {
                                    sendJsonResponse(res, 404, {
                                        error: 'No user found to update the account status. contact admin',
                                    });
                                }
                                else {
                                    user.validationStatus = true;

                                    user.save(err => {
                                        if (err) {
                                            sendJsonResponse(res, 404, {
                                                error: err,
                                            });
                                        }
                                        else {
                                            sendJsonResponse(res, 404, {
                                                success: true,
                                            });
                                        }
                                    });
                                }
                            });
                    }
                });
        }
    });
};


/*
|----------------------------------------------
| Following function will get all statuses from
| each collection based on given userId
|----------------------------------------------
*/
module.exports.getAccountStatuses = (req, res) => {

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Users
                .findOne({ email: req.params.userId })
                .select('statuses')
                .exec((err, user) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            statuses: user.statuses,
                        });
                    }
                });
        }
    });
};

/*
|----------------------------------------------
| Following function will update user status
| based on given values.
|----------------------------------------------
*/
module.exports.updateUserStatus = (req, res) => {

    const statusObject = Joi.object().keys({
        update_at: Joi.string().required(),
        email: Joi.string().email().required(),
        status: Joi.boolean().required(),
    });

    Joi.validate(req.body, statusObject, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Users
                .findOne({ email: req.body.email })
                .select('statuses')
                .exec((err, user) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else if (!user) {
                        sendJsonResponse(res, 404, {
                            error: `No user found with ${req.body.email}`,
                        });
                    }
                    else if (user.statuses && user.statuses.length > 0) {
                        const newStatus = user.statuses[0];

                        newStatus[req.body.update_at] = req.body.status;

                        user.save(err => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: err,
                                });
                            }
                            else {
                                sendJsonResponse(res, 200, {
                                    updated: true,
                                });
                            }
                        });
                    }
                    else {
                        sendJsonResponse(res, 404, {
                            error: 'Error no statuses found for user',
                        });
                    }
                });
        }
    });
};


module.exports.createBasicProfile = (req, res) => {
    const basicAccountInfo = Joi.object().keys({
        whos: Joi.string().email(),
        userId: Joi.string().min(24).max(24).required(),
        formerName: Joi.string().regex(/^[a-zA-Z ]{3,50}$/).allow('', null),
        sex: Joi.string().min(4).max(6).regex(/^[a-z]{4,6}$/).required(),
        tele: Joi.string().min(11).max(11).regex(/^[0-9]{11,11}$/).required(),
        address: Joi.string().min(8).max(50).regex(/^[a-zA-Z0-9, ]{8,50}$/).required(),
    });

    Joi.validate(req.body, basicAccountInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            const profile = new Profile();
            const profileId = UId.sync(10);
            profile.profileId = profileId;
            profile.whos = req.body.whos;
            profile.userId = req.body.userId;
            profile.formerName = req.body.formerName;
            profile.sex = req.body.sex;
            profile.telephone = req.body.tele;
            profile.address = req.body.address;

            profile.save((err) => {
                if (err) {
                    sendJsonResponse(res, 404, {
                        error: err,
                    });
                }
                else {
                    sendJsonResponse(res, 200, {
                        success: true,
                        profile: profile,
                    });
                }
            });
        }
    });
};


/*
|----------------------------------------------
| Edit basic info based on given user id & 
| details
|----------------------------------------------
*/
module.exports.editBasicProfile = (req, res) => {

    const userId = Joi.object().keys({
        userId: Joi.string().email().required(),
    });

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            const updateInfo = Joi.object().keys({
                name: Joi.string().regex(/^[a-zA-Z ]{3,50}$/).allow('', null),
                sex: Joi.string().min(4).max(6).regex(/^[a-z]{4,6}$/).required(),
                tele: Joi.string().min(11).max(11).regex(/^[0-9]{11,11}$/).required(),
                address: Joi.string().min(8).max(50).regex(/^[a-zA-Z0-9, ]{8,50}$/).required(),
            });

            Joi.validate(req.body, updateInfo, (err, value) => {
                if (err) {
                    sendJsonResponse(res, 404, {
                        error: err.details[0].message,
                    });
                }
                else {
                    Profile
                        .findOne({ whos: req.params.userId })
                        .exec((err, profile) => {
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    error: err,
                                });
                            }
                            else if (!profile) {
                                sendJsonResponse(res, 404, {
                                    error: `Error! can't found any profile with given id ${req.params.userId}`,
                                });
                            }
                            else {
                                profile.address = req.body.address;
                                profile.sex = req.body.sex;
                                profile.formerName = req.body.name;
                                profile.telephone = req.body.tele;

                                profile.save(err => {
                                    if (err) {
                                        sendJsonResponse(res, 404, {
                                            error: `Error while saving new info, contact admin`,
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
        }
    });
};


/*
|----------------------------------------------
| Following function will save branch info for
|----------------------------------------------
*/
module.exports.saveBranchInfo = (req, res) => {

    const branchInfo = Joi.object().keys({
        year: Joi.string().min(4).max(4).regex(/^[0-9]{4,4}$/).required(),
        branch: Joi.string().min(3).max(20).regex(/^[a-zA-Z ]{3,20}$/).required(),
    });

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Joi.validate(req.body, branchInfo, (err, value) => {
                if (err) {
                    sendJsonResponse(res, 404, {
                        error: err.details[0].message,
                    });
                }
                else {
                    const branch = new Branch();

                    branch.branchId = UId.sync(10);
                    branch.whos = req.params.userId;
                    branch.barYear = req.body.year;
                    branch.nbaBranch = req.body.branch;

                    branch.save(err => {
                        if (err) {
                            sendJsonResponse(res, 404, {
                                error: 'Error while saving branch info. Contact admin',
                            });
                        }
                        else {
                            sendJsonResponse(res, 404, {
                                success: true,
                            });
                        }
                    });
                }
            });
        }
    });
};


/*
|----------------------------------------------
| Following function will get the user data
| based on given userId and collection name
|----------------------------------------------
*/
module.exports.loadUserInfo = (req, res) => {
    const info = Joi.object().keys({
        collectionName: Joi.string().min(3).max(24).regex(/^[a-zA-Z]{3,24}$/),
        userId: Joi.string().email().required(),
    });

    Joi.validate(req.params, info, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            const collectionName = Mongoose.model(req.params.collectionName);

            collectionName
                .findOne({ whos: req.params.userId })
                .exec((err, info) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            userInfo: info,
                        });
                    }
                });
        }
    });
};


/*
|----------------------------------------------
| Following function will upload file for bank
| teller
|----------------------------------------------
*/
module.exports.uploadBankTeller = (req, res) => {

    const userDir = './users/' + req.params.userId;

    // create directory if it doesn't exists.
    if (!Fs.existsSync(userDir)) {
        Fs.mkdirSync(userDir);
    }
    
    const storage = Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './users/' + req.params.userId);
        },
        filename: function (req, file, cb) { 
            if (!file.originalname.match(/\.(png|jpeg|jpg|JPG|pdf)$/)) {
                const err = new Error(); 
                err.code = 'filetype';
                return cb(err);
            } 
            else {
                const fileid = UId.sync(10);
                cb(null, fileid + file.originalname);
            } 
        },
    });

    const upload = Multer({
        storage: storage,
        limits: { fileSize: 5000000 },
    }).single('tellerDoc');

    upload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                sendJsonResponse(res, 404, {
                    success: false,
                    error: "File size is too large",
                });
            }
            else if (err.code === 'filetype') {
                sendJsonResponse(res, 404, {
                    success: false,
                    error : "Invalid file type",
                });
            }
            else {
                sendJsonResponse(res, 404, {
                    success: false,
                    error: err,
                });
            }
        }
        else {
            if (!req.file) {
                sendJsonResponse(res, 404, {
                    success: false,
                    error: "Please select a product image",
                });
            }
            else {
                sendJsonResponse(res, 200, {
                    success: true,
                    docLocation: req.params.userId + '/' + req.file.filename,
                });
            }
        }
    });
};


/*
|----------------------------------------------
| Following function will save bank teller in
| mongodb
|----------------------------------------------
*/
module.exports.saveBankTeller = (req, res) => {
    const tellerInfo = Joi.object().keys({
        preferredCommittee: Joi.string().required(),
        additional_committee: Joi.string().required(),
        whos: Joi.string().email().required(),
        userId: Joi.string().required(),
        tellerDoc: Joi.string().required(),
    });

    Joi.validate(req.body, tellerInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {

            const newteller = new BankTeller();

            newteller.tellerId = UId.sync(10);
            newteller.whos = req.body.whos;
            newteller.userId = req.body.userId;
            newteller.preferredCommittee = req.body.preferredCommittee;
            newteller.additionalCommittee = req.body.additional_committee;
            newteller.tellerLocation = req.body.tellerDoc;

            newteller.save(err => {
                if (err) {
                    sendJsonResponse(res, 404, {
                        error: err,
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
};


/*
|----------------------------------------------
| Following function will get bank teller based
| on given user id.
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/
module.exports.showTellerInfo = (req, res) => {
    const userId = Joi.object().keys({
        userId: Joi.string().email().required(),
    });

    Joi.validate(req.params, userId, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            BankTeller
                .findOne({ whos: req.params.userId })
                .exec((err, bankteller) => {
                    if (err) {
                        sendJsonResponse(res, 404, {
                            error: err,
                        });
                    }
                    else {
                        sendJsonResponse(res, 200, {
                            bankTeller: bankteller,
                        });
                    }
                });
        }
    });
};
