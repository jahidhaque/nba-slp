/*
|----------------------------------------------
| setting up authentication service 
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/

'use strict';

angular
    .module('nbaslp')
    .service('authentication', authentication);

authentication.$inject = ['$window', '$http'];

function authentication($window, $http) {
// saving token.
    const saveToken =	function (token) {
        $window.localStorage['nbaslp'] = token;
    };

    const getToken =	function () {
        return $window.localStorage['nbaslp'];
    };

    const isLoggedIn = () => {
        const token = getToken();
        let payload;

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload;
        }
        else {
            return false;
        }
    };

    const currentUser = () => {
        if (isLoggedIn) {
            const token = getToken();
            let payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return {
                userId: payload._id,
                email: payload.email,
                accountStatus: payload.accountStatus,
                accountType: payload.accountType,
                accountId: payload.userId,
                name: payload.name,
            };
        }
        else {
            return false;
        }
    };

    const Logout = () => {
        $window.localStorage.removeItem('nbaslp');
    };

    const signUp = (user) => {
        return $http.post('/api/signup', user).success(function (data) {
            saveToken(data.token);
        });
    };

    const signIn = (user) => {
        return $http.post('/api/signin', user).success(function (data) {
            saveToken(data.token);
        });
    };

    const checkUser = (data) => {
        return $http
            .post('/api/checkuser', data)
            .then(handleSuccess)
            .catch(handleError);
    };

    const countUser = (userId) => {
        return $http 
            .get('/api/' + userId + '/count')
            .then(handleSuccess)
            .catch(handleError);
    };

    const verifyKey = (userId, key) => {
        return $http
            .get('/api/' + userId + '/' + key + '/verify')
            .then(handleSuccess)
            .catch(handleError);
    };

    const changePassword = (data) => {
        return $http 
            .post('/api/changepassword', data)
            .then(handleSuccess)
            .catch(handleError);
    };

    const handleSuccess = (response) => response;

    const handleError = (response) => response;

    return {
        currentUser: currentUser,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        signUp: signUp,
        signIn: signIn,
        checkUser: checkUser,
        countUser: countUser,
        verifyKey: verifyKey,
        changePassword: changePassword,
        Logout: Logout,
    };
}

