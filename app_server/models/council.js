/*
|----------------------------------------------
| setting up council schema for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/
const Mongoose = require('mongoose');

const councilSchema = new Mongoose.Schema({
    name: {
        type: String, min: 5, max: 100, required: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'council';

Mongoose.model('council', councilSchema, collectionName);
