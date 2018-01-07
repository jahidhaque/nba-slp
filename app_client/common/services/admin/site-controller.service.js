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

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            addPreferredCommittee: addPreferredCommittee,
        };

    }

})();
