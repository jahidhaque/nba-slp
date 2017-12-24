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

/*
|----------------------------------------------
| Following routes for authentication- signup, 
| signin, email varification, password reset etc
|----------------------------------------------
*/
Routes.post('/signup', Authentication.signup);
Routes.post('/signin', Authentication.signin);

module.exports = Routes;
