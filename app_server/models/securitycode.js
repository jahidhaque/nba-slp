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
        type: String, min: 10, max: 10, required: true, 
    },
    securityCode: {
        type: String, min: 10, max: 10, required: true, 
    },
    hash: {
        type: String, required: true,
    },
    salt: {
        type: String, required: true,
    },
    codeHolder: {
        type: String, required: true,
    },
    valid: {
        type: Boolean, default: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
});

securityCodeSchema.methods.setCode = function (securityCode) {
    this.salt = Crypto.randomBytes(16).toString('hex');
    this.hash = Crypto.pbkdf2Sync(securityCode, this.salt, 1000, 64, 'sha512').toString('hex');
};


securityCodeSchema.methods.validateCode = function (securityCode) {
    const hash = Crypto.pbkdf2Sync(securityCode, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

const collectionName = 'securityCode';

// registering shcema with mongoose.
Mongoose.model('securityCode', securityCodeSchema, collectionName);

