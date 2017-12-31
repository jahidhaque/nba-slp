/*
|----------------------------------------------
| setting up routes for backends
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

const Express = require('express');

const Routes = Express.Router();

const Authentication = require('../controllers/authentication');

const AccountController = require('../controllers/AccountController');

/*
|----------------------------------------------
| Following routes for authentication- signup, 
| signin, email varification, password reset etc
|----------------------------------------------
*/
Routes.post('/signup', Authentication.signup);
Routes.post('/signin', Authentication.signin);

/*
|----------------------------------------------
| Following routes for account use only 
|----------------------------------------------
*/
Routes.post('/createbasicprofile', AccountController.createBasicProfile);

module.exports = Routes;
