/*
|----------------------------------------------
| setting up profile model 
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const profileSchema = new Mongoose.Schema({
    profileId: {
        type: String, required: true, unique: true, 
    },
    whos: {
        type: String, required: true, unique: true, 
    },
    userId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    formerName: {
        type: String, min: 3, max: 50,
    },
    sex: {
        type: String, min: 4, max: 6,
    },
    telephone: {
        type: String, min: 11, max: 11,
    },
    address: {
        type: String, min: 8, max: 50, required: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'profile';

Mongoose.model('profile', profileSchema, collectionName);

