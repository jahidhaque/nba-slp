/*
|----------------------------------------------
| setting up committee schema for committee
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

const Mongoose = require('mongoose');

const committeSchema = new Mongoose.Schema({
    committeeId: { 
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    name: {
        type: String, min: 5, max: 50, required: true,
    },
    chairman: {
        type: String, min: 5, max: 24, required: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'committee';

Mongoose.model('committee', committeSchema, collectionName);
