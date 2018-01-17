/*
|----------------------------------------------
| setting up event schema for the db
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

const Mongoose = require('mongoose');

const eventSchema = new Mongoose.Schema({
    eventId: {
        type: String, min: 10, max: 10, required: true,
    },
    eventTitle: {
        type: String, required: true,
    },
    eventDetails: {
        type: String, required: true,
    },
    eventStarts: {
        type: String, required: true,
    },
    eventEnds: {
        type: String, required: true,
    },
    createAt: {
        type: Date, default: Date.now(), required: true,
    },

});

const collectionName = 'event';

Mongoose.model('event', eventSchema, collectionName);
