var growboxServices = angular.module('growboxServices', ['ngResource']);

growboxServices.factory('SeedService', ['$resource',
    function ($resource) {
        return $resource('data/:seedId.json', {}, {
            query: {method: 'GET', params: {seedId: 'seeds'}, isArray: true}
        });
    }]);

growboxServices.factory('UserService',
        function () {
            var userService = {};
            userService.connected = false;
            userService.isConnected = function () {
                return userService.connected;
            };
            userService.setUser = function (user) {
                userService.user = user;
                userService.connected = true;
            };
            userService.updateProfile = function (mail, firstname, lastname, img) {
                userService.user.mail = mail;
                userService.user.firstname = firstname;
                userService.user.lastname = lastname;
                userService.user.img = img;
            };

            userService.clearUser = function () {
                userService.user = undefined;
                userService.connected = false;
            };

            userService.getUser = function () {
                return userService.user;
            };

            return userService;
        }
);

growboxServices.factory('LoginService', ['$http', '$location', 'UserService',
    function ($http, $location, UserService) {
        var loginService = {};
        var user = {};
        loginService.login = function () {
            $http.get('data/user.json').success(function (data) {
                user = data;
                UserService.setUser(user);
                $location.path("/home");
            });
        };
        loginService.logout = function () {
            UserService.clearUser();
        };
        return loginService;
    }
]);

growboxServices.factory('ArduinoService', ['$http',
    function ($http) {
        var arduinoService = {};
        arduinoService.sendDac = function ( elem ) {
            var value = elem.value();
            var dacId = elem.id;
            value = Math.floor(value * 2.55);
            var url = "/arduino/dac/" + dacId + "/" + value;
            $http.get(url).success( function (data) {
                console.log(data);
                return data;
            });
        };
        arduinoService.statusArray = [];
        arduinoService.getStatus = function(){
            var url = "/arduino/status/99";
            $http.get( url ).success( function ( data ) {
                arduinoService.statusArray = data.split('#');
            });
        };
        return arduinoService;
    }
]);