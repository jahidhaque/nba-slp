/*
|----------------------------------------------
| setting up model for security code schema
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');

const Crypto = require('crypto');

const securityCodeSchema = new Mongoose.Schema({
    codeId: {
        type: String, min: 10, max: 10, required: true, unique: true,
    },
    key: {
        type: String, required: true, unique: true,
    },
    code: {
        type: String, required: true,
    },
    codeHolder: {
        type: String, required: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

securityCodeSchema.methods.setCode = function (key) {
    this.code = Crypto.pbkdf2Sync(key, this.key, 1000, 5, 'sha512').toString('hex');
};

const collectionName = 'securityCode';

// registering shcema with mongoose.
Mongoose.model('securityCode', securityCodeSchema, collectionName);

