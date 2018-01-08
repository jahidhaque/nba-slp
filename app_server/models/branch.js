/*
|----------------------------------------------
| setting up batch schema for application
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const batchSchema = new Mongoose.Schema({
    branchId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    whos: {
        type: String, unique: true, required: true,
    },
    barYear: {
        type: String, min: 10, max: 10, required: true,
    },
    nbaBranch: {
        type: String, min: 10, max: 10, required: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'branch';

Mongoose.model('branch', batchSchema, collectionName);
