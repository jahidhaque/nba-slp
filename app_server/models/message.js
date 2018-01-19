/*
|----------------------------------------------
| setting up message schema for the application
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

const Mongoose = require('mongoose');

const messageSchema = new Mongoose.Schema({
    messageId: {
        type: String, min: 10, max: 10, required: true,
    },
    messageSender: {
        type: String, required: true,
    },
    messageReceiver: {
        type: String, default: 'nbaadmin@nba-slp.org', required: true,
    },
    senderName: {
        type: String, required: true,
    },
    message: {
        type: String, required: true,
    },
});

const collectionName = 'message';

Mongoose.model('message', messageSchema, collectionName);
