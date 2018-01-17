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

const Event = Mongoose.model('event');

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

/*
|----------------------------------------------
| Following function will get all the data
| from the collection
|----------------------------------------------
*/
module.exports.showCommittees = (req, res) => {
    Committee
        .find()
        .exec((err, committees) => {
            if (err) {
                sendJsonResponse(res, 404, {
                    error: err,
                });
            }
            else {
                sendJsonResponse(res, 200, {
                    committee: committees,
                });
            }
        });
};


/*
|----------------------------------------------
| Following function will delete a committee 
| based on given committee id.
|----------------------------------------------
*/
module.exports.removeCommittee = (req, res) => {
    const committeeInfo = Joi.object().keys({
        committeeId: Joi.string().min(24).max(24).regex(/^[a-z0-9]{24,24}$/).required(),
    });

    Joi.validate(req.params, committeeInfo, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            Committee
                .findByIdAndRemove(req.params.committeeId)
                .exec((err) => {
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
| Following function will add new event to the
| database
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

module.exports.addEvent = (req, res) => {
    console.log(req.body);
    const event = Joi.object().keys({
        eventTitle: Joi.string().required(),
        eventDetails: Joi.string().required(),
        eventStarts: Joi.string().required(),
        eventEnds: Joi.string().required(),
    });

    Joi.validate(req.body, event, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {

            const event = new Event();
            event.eventId = UId.sync(10);
            event.eventTitle = req.body.eventTitle;
            event.eventDetails = req.body.eventDetails;
            event.eventStarts = req.body.eventStarts;
            event.eventEnds = req.body.eventEnds;

            event.save(err => {
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

