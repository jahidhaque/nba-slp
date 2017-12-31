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
        const saveBasicInfo = (data) => {
            return $http 
                .post('/api/createbasicprofile', data)
                .then(handleSuccess)
                .catch(handleError);
        };

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            saveBasicInfo: saveBasicInfo,
        };
    }

})();
