/*
|----------------------------------------------
| setting up current-position schema
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const currentPositionSchema = new Mongoose.Schema({
    positionId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    whos: {
        type: String, unique: true, required: true,
    },
    userid: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    company: {
        type: String, min: 3, max: 24,
    },
    position: {
        type: String, min: 3, max: 24,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'current_position';

Mongoose.model('current_positon', currentPositionSchema, collectionName);
