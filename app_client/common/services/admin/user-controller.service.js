/*
|----------------------------------------------
| setting up user controller service
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {
    angular
        .module('nbaslp')
        .service('usercontroller', usercontroller);

    usercontroller.$inject = ['$http'];

    function usercontroller($http) {


        const showMembers = () => {
            return $http
                .get('/api/members')
                .then(handleSuccess)
                .catch(handleError);
        };

        const showSingleMember = (memberId) => {
            return $http 
                .get('/api/' + memberId + '/member')
                .then(handleSuccess)
                .catch(handleError);
        };

        const showMemberProfile = (memberId) => {
            return $http 
                .get('/api/' + memberId + '/profile')
                .then(handleSuccess)
                .catch(handleError);
        };

        const showMemberBranch = (memberId) => {
            return $http 
                .get('/api/' + memberId + '/branch')
                .then(handleSuccess)
                .catch(handleError);
        };

        const filterAction = (source, action) => {
            return $http 
                .get('/api/' + source + '/' + action)
                .then(handleSuccess)
                .catch(handleError);
        };

        const searchUser = (query) => {
            return $http 
                .get('/api/search/user/' + query)
                .then(handleSuccess)
                .catch(handleError);
        };

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            showMembers: showMembers,
            showSingleMember: showSingleMember,
            showMemberProfile: showMemberProfile,
            showMemberBranch: showMemberBranch,
            filterAction: filterAction,
            searchUser: searchUser,
        };
    }

})();