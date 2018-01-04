/*
|----------------------------------------------
| setting up model for user collection
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const Crypto = require('crypto');

const statusSchema = new Mongoose.Schema({
    profile: { type: Boolean, required: true, default: false },
    basic_info: { type: Boolean, required: true, default: false },
    current_profile: { type: Boolean, required: true, default: false },
    bankteller: { type: Boolean, required: true, default: false },
    batch: { type: Boolean, required: true, default: false },
});

const userSchema = new Mongoose.Schema({
    userId: {
        type: String, min: 10, max: 10, required: true,
    },
    firstName: { 
        type: String, min: 3, max: 24, required: true,
    },
    lastName: { 
        type: String, min: 3, max: 24, required: true,
    },
    displayName: { 
        type: String, min: 3, max: 24,
    },
    email: {
        type: String, unique: true, required: true,
    },
    hash: {
        type: String, required: true,
    },
    salt: {
        type: String, required: true,
    },
    userDir: {
        type: String, default: 'null',
    },
    validationStatus: {
        type: Boolean, default: false,
    },
    statuses: [statusSchema],
    createdAt: {
        type: Date, default: Date.now,
    },
});

/*
|----------------------------------------------------------------
| encrypt password.
|----------------------------------------------------------------
*/
userSchema.methods.setPassword = function (password) {
    this.salt = Crypto.randomBytes(16).toString('hex');
    this.hash = Crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/*
|----------------------------------------------------------------
| Setting up method to validate password.
|----------------------------------------------------------------
*/
userSchema.methods.validatePassword = function (password) {
    const hash = Crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

/*
|----------------------------------------------------------------
| setting up jsonwebtoken.
|----------------------------------------------------------------
*/
userSchema.methods.generateJwt = function () {
    // setting expiry date.
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 14);

    return Jwt.sign({
        _id: this._id,
        userId: this.userId,
        email: this.email,
        name: this.displayName,
        accountStatus: this.validationStatus,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.jswntokenkey);
};

const collectionName = 'users';

// registering shcema with mongoose.
Mongoose.model('users', userSchema, collectionName);
