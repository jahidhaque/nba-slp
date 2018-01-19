/*
|----------------------------------------------
| setting up contact controller for the app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2018
|----------------------------------------------
*/

'use strict';

(function () {
    
    angular
        .module('nbaslp')
        .controller('contactusCtrl', contactusCtrl);

    contactusCtrl.$inject = ['systemService'];

    function contactusCtrl(systemService) {
        const cvm = this;

        cvm.contact = {
            name: '',
            email: '',
            message: '',
        };

        cvm.contactUs = () => {
            systemService
                .sendContactMessage(cvm.contact)
                .then(response => {
                    if (response.data.error) {
                        cvm.sendMessageError = true;
                        cvm.sendMessageErrorMsg = response.data.error;
                    }
                    else {
                        cvm.sendMessageSuccess = true;
                        cvm.sendMessageSuccessMsg = 'We have received your message. We will be in touch with you soon';
                    }
                })
                .catch(err => {
                    cvm.sendMessageError = true;	
                    cvm.sendMessageErrorMsg = err;	
                });
        };
    }

})();