/*
|----------------------------------------------
| setting up system service for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nab-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {

    angular
        .module('nbaslp')
        .service('systemService', systemService);
        
    systemService.$inject = ['$http'];

    function systemService($http) {
        
        const sendContactMessage = (message) => {
            return $http
                .post('/api/sendmessage', message)
                .then(handleSuccess)
                .catch(handleError);
        };

        const handleSuccess = (response) => response;

        const handleError = (response) => response;

        return {
            sendContactMessage: sendContactMessage,
        };
    }

})();