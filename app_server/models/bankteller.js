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
        type: String, min: 10, max: 10, required: true, 
    },
    whos: {
        type: String, required: true,
    },
    userId: {
        type: String, min: 10, max: 10, required: true, 
    },
    preferredCommittee: {
        type: String, min: 3, max: 24, required: true,
    },
    additionalCommittee: {
        type: String, min: 3, max: 24,
    },
    bank: {
        type: String, required: true,
    },
    branch: {
        type: String, required: true,
    },
    depositor: {
        type: String, required: true,
    },
    depositor_tel: {
        type: String, min: 11, max: 11, required: true,
    },
    tellerno: {
        type: Number, required: true, 
    },
    amount: {
        type: Number, required: true,
    },
    datedeposit: {
        type: Date, required: true,
    },

    tellerApproved: {
        type: Boolean, default: false, 
    },
    tellerValidTill: {
        type: String, default: 'valid till date',
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

const collectionName = 'bank_teller';

Mongoose.model('bank_teller', bankTellerSchema, collectionName);
