/*
|----------------------------------------------
| setting up service for site-controller for admin
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .service('sitecontroller', sitecontroller);

    sitecontroller.$inject = ['$http'];

    function sitecontroller($http) {
        
        const addPreferredCommittee = (data) => {
            return $http
                .post('/api/createcommittee', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const showAllCommittee = () => {
            return $http
                .get('/api/showcommittee')
                .then(handleSuccess)
                .catch(handleError);
        };

        const removeCommittee = (committeeId) => {
            return $http 
                .delete('/api/' + committeeId + '/removecommittee')
                .then(handleSuccess)
                .catch(handleError);
        };

        const addCouncil = (data) => {
            return $http 
                .post('/api/councilmember', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const showCouncilMember = () => {
            return $http 
                .get('/api/showcouncil')
                .then(handleSuccess)
                .catch(handleError);
        };

        const removeCouncil = (councilId) => {
            return $http 
                .delete('/api/' + councilId + '/council')
                .then(handleSuccess)
                .catch(handleError);
        };

        const addEvent = (event) => {
            return $http 
                .post('/api/event', event)
                .then(handleSuccess)
                .catch(handleError);
        };

        const showEvent = () => {
            return $http
                .get('/api/showEvent')
                .then(handleSuccess)
                .catch(handleError);
        };

        const removeEvent = (eventId) => {
            return $http
                .delete('/api/' + eventId + '/event')
                .then(handleSuccess)
                .catch(handleError);
        };

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            addPreferredCommittee: addPreferredCommittee,
            showAllCommittee: showAllCommittee,
            removeCommittee: removeCommittee,
            addCouncil: addCouncil,
            showCouncilMember: showCouncilMember,
            removeCouncil: removeCouncil,
            addEvent: addEvent,
            showEvent: showEvent,
            removeEvent: removeEvent,
        };

    }

})();
