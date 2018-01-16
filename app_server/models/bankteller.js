/*
|----------------------------------------------
| setting up back teller
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const bankTellerSchema = new Mongoose.Schema({
    tellerId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    whos: {
        type: String, required: true,
    },
    userId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    preferredCommittee: {
        type: String, min: 3, max: 24, required: true,
    },
    additionalCommittee: {
        type: String, min: 3, max: 24,
    },
    tellerLocation: {
        type: String, min: 10, max: 40, required: true, unique: true,
    },
    tellerApproved: {
        type: Boolean, default: false, required: true,
    },
    tellerValidTill: {
        type: Date, 
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'bank_teller';

Mongoose.model('bank_teller', bankTellerSchema, collectionName);
