/*
|----------------------------------------------
| setting up controller for system use
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

const Mongoose = require('mongoose');

const Joi = require('joi');

const Uid = require('uid-safe');

const Message = Mongoose.model('message');


/*
|----------------------------------------------------------------
| function for returning json.
|----------------------------------------------------------------
*/
const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.sendMessage = (req, res) => {
    const message = Joi.object().keys({
        name: Joi.string().min(3).max(25).required().regex(/^[a-zA-Z ]{3,25}$/),
        email: Joi.string().email().required(),
        message: Joi.string().min(10).max(400),
    });

    Joi.validate(req.body, message, (err, value) => {
        if (err) {
            sendJsonResponse(res, 404, {
                error: err.details[0].message,
            });
        }
        else {
            const message = new Message();

            message.messageId = Uid.sync(10);
            message.messageSender = req.body.email;
            message.senderName = req.body.name;
            message.message = req.body.message;

            message.save(err => {
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
