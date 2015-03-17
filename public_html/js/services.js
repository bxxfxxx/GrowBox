var growboxServices = angular.module('growboxServices', ['ngResource']);

growboxServices.factory('SeedService', ['$resource',
    function ($resource) {
        return $resource('data/:seedId.json', {}, {
            query: {method: 'GET', params: {seedId: 'seeds'}, isArray: true}
        });
    }]);

growboxServices.factory( 'UserService',
        function () {
            var userService = {};
            userService.connected = false;
            userService.isConnected = function () {
                return userService.connected;
            };
            userService.setUser = function ( user ) {
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
            
            userService.getUser = function(){
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
            $http.get('data/user.json').success( function( data ){
                user = data;
                UserService.setUser( user );
                $location.path("/home");
            });
        };
        loginService.logout = function () {
            UserService.clearUser();
        };
        return loginService;
    }
]);

growboxServices.factory('ArduinoService',['$http',
    function(){
        var arduinoService = {};
        arduinoService.sendDac = function(Pin, value) {
            var ValNum = "valueDac" + Pin;
            document.getElementById(ValNum).innerHTML = value * 100 / 255 - value * 100 / 255 % 1;
            document.getElementById("description").innerHTML = "Processing Slider";
            server = "/arduino/dac/" + Pin + "/" + value;
            request = new XMLHttpRequest();
            request.onreadystatechange = updateasyncDac;
            request.open("GET", server, true);
            request.send(null);
        };
        
        return arduinoService;
    }
]);