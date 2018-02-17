/*
|----------------------------------------------
| setting up account service for app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .service('account', account);

    account.$inject = ['$window', '$http'];

    function account($window, $http) {

        const resetPassword = (userId, resetData) => {
            return $http 
                .post('/api/' + userId + '/resetpassword', resetData)
                .then(handleSuccess)
                .catch(handleError);
        };

        const createActivationCode = (userId) => {
            return $http 
                .post('/api/' + userId + '/generatevalidationcode')
                .then(handleSuccess)
                .catch(handleError);
        };

        const validateActivationCode = (userId, code) => {
            return $http 
                .post('/api/' + userId + '/' + code + '/validate')
                .then(handleSuccess)
                .catch(handleError);
        };

        const getAccountStatuses = (userId) => {
            return $http 
                .get('/api/' + userId + '/statuses')
                .then(handleSuccess)
                .catch(handleError);
        };

        const getCommittee = () => {
            return $http
                .get('/api/showcommittee')
                .then(handleSuccess)
                .catch(handleError);
        };

        const updateUserStatus = function (data) {
            return $http
                .post('/api/userstatus', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const saveBasicInfo = (data) => {
            return $http 
                .post('/api/createbasicprofile', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const editBasicInfo = (userId, data) => {
            return $http
                .put('/api/' + userId + '/editbasicinfo', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const saveBranchInfo = (userId, data) => {
            return $http
                .post('/api/' + userId + '/savebranchinfo', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const editBranchInfo = (userId, data) => {
            return $http 
                .put('/api/' + userId + '/branch', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const uploadTellerDocs = (userId, data) => {            
            return $http
                .post('/api/' + userId + '/bankteller', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const saveBankTeller = (teller) => {
            return $http
                .post('/api/savebankteller', teller)
                .then(handleSuccess)
                .catch(handleError);
        };

        const getBankTeller = (userId) => {
            return $http 
                .get('/api/' + userId + '/bankteller')
                .then(handleSuccess)
                .catch(handleError);
        };

        /*
        |----------------------------------------------
        | Following function will load all data for user
        | based on given userEmail and collection name
        |----------------------------------------------
        */
        const loadUserInfo = (collectionName, userId) => {
            return $http 
                .get('/api/' + userId + '/' + collectionName + '/userinfo')
                .then(handleSuccess)
                .catch(handleError);
        };

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            resetPassword: resetPassword,
            uploadTellerDocs: uploadTellerDocs,
            createActivationCode: createActivationCode,
            validateActivationCode: validateActivationCode,
            getAccountStatuses: getAccountStatuses,
            updateUserStatus: updateUserStatus,
            saveBasicInfo: saveBasicInfo,
            editBasicInfo: editBasicInfo,
            saveBranchInfo: saveBranchInfo,
            editBranchInfo: editBranchInfo,
            loadUserInfo: loadUserInfo,
            getCommittee: getCommittee,
            saveBankTeller: saveBankTeller,
            getBankTeller: getBankTeller,
        };
    }

})();
