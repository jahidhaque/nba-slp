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

        const getAccountStatuses = (userId) => {
            return $http 
                .get('/api/' + userId + '/statuses')
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

        const saveBranchInfo = (userId, data) => {
            return $http
                .post('/api/' + userId + '/savebranchinfo', data)
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
            getAccountStatuses: getAccountStatuses,
            updateUserStatus: updateUserStatus,
            saveBasicInfo: saveBasicInfo,
            saveBranchInfo: saveBranchInfo,
            loadUserInfo: loadUserInfo,
        };
    }

})();
