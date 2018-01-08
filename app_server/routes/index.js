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

const siteController = require('../controllers/SiteController');

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
Routes.get('/:userId/statuses', AccountController.getAccountStatuses);
Routes.post('/createbasicprofile', AccountController.createBasicProfile);
Routes.post('/userstatus', AccountController.updateUserStatus);
Routes.post('/:userId/savebranchinfo', AccountController.saveBranchInfo);
Routes.get('/:userId/:collectionName/userinfo', AccountController.loadUserInfo);


/*
|----------------------------------------------
| following routes are only for admin.
|----------------------------------------------
*/
Routes.post('/createcommittee', siteController.createCommittee);
Routes.get('/showcommittee', siteController.showCommittees);
Routes.delete('/:committeeId/removecommittee', siteController.removeCommittee);

module.exports = Routes;
