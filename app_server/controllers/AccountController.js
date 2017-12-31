/*
|----------------------------------------------
| setting up account controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const Profile = Mongoose.model('profile');

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
            profile.telephone = req.body.telephone;
            profile.address = req.body.address;

            console.log(profileId);

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
