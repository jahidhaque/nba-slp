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

const userController = require('../controllers/userController');

const systemController = require('../controllers/systemController');

/*
|----------------------------------------------
| Following routes for authentication- signup, 
| signin, email varification, password reset etc
|----------------------------------------------
*/
Routes.post('/signup', Authentication.signup);
Routes.post('/signin', Authentication.signin);
Routes.post('/checkuser', Authentication.checkingUser);
Routes.get('/:userId/count', Authentication.countUser);

/*
|----------------------------------------------
| Following routes for account use only 
|----------------------------------------------
*/
Routes.post('/:userId/resetpassword', AccountController.resetPassword);
Routes.get('/:userId/statuses', AccountController.getAccountStatuses);
Routes.post('/createbasicprofile', AccountController.createBasicProfile);
Routes.put('/:userId/editbasicinfo', AccountController.editBasicProfile);
Routes.post('/userstatus', AccountController.updateUserStatus);
Routes.post('/:userId/savebranchinfo', AccountController.saveBranchInfo);
Routes.get('/:userId/:collectionName/userinfo', AccountController.loadUserInfo);
Routes.post('/:userId/generatevalidationcode', AccountController.generateSecurityCode);
Routes.post('/:userId/:code/validate', AccountController.validateCode);
Routes.post('/docupload/:userId/', AccountController.uploadBankTeller);
Routes.post('/savebankteller', AccountController.saveBankTeller);
Routes.get('/:userId/bankteller', AccountController.showTellerInfo);


/*
|----------------------------------------------
| following routes are only for admin.
|----------------------------------------------
*/
Routes.post('/createcommittee', siteController.createCommittee);
Routes.get('/showcommittee', siteController.showCommittees);
Routes.delete('/:committeeId/removecommittee', siteController.removeCommittee);
Routes.post('/event', siteController.addEvent);
Routes.get('/showEvent', siteController.showEvent);
Routes.delete('/:eventId/event', siteController.deleteEvent);
Routes.get('/members', userController.showMembers);
Routes.get('/:memberId/member', userController.showMember);
Routes.get('/:memberId/profile', userController.showMemberProfile);
Routes.get('/:memberId/branch', userController.showMemberBranch);
Routes.post('/councilmember', siteController.createCouncil);
Routes.get('/showcouncil', siteController.showcouncil);
Routes.delete('/:councilId/council', siteController.deleteCouncil);

/*
|----------------------------------------------
| following routes are for system use only
|----------------------------------------------
*/
Routes.post('/sendmessage', systemController.sendMessage);

module.exports = Routes;
