/*
|----------------------------------------------
| setting up controller for site-controller 
| for admin
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

const Joi = require('joi');

const Mongoose = require('mongoose');

const UId = require('uid-safe');

const Committee = Mongoose.model('committee');

/*
|----------------------------------------------------------------
| function for returning json.
|----------------------------------------------------------------
*/
const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createCommittee = (req, res) => {
    const committeeInfo = Joi.object().keys({
        name: Joi.string().min(5).max(50).regex(/^[a-zA-Z ]{5,50}$/),
    });

    Joi.validate(req.body, committeeInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            const committee = new Committee();
            committee.committeeId = UId.sync(10);
            committee.name = req.body.name;

            committee.save(err => {
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
