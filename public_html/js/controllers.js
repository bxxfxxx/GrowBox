var growboxControllers = angular.module('growboxControllers', []);

growboxControllers.controller('HomeCtrl', ['$scope', 'UserService',
    function ($scope, UserService) {
        $scope.isConnected = UserService.isConnected;
        $scope.message = "Bienvenue" + (UserService.isConnected() ? " " + UserService.user.firstname + " " + UserService.user.lastname + " !" : "");
    }
]);

growboxControllers.controller('SeedListCtrl', ['$scope', '$routeParams', 'SeedService', 'UserService',
    function ($scope, $routeParams, SeedListService, UserService) {
        $scope.activeId = $routeParams.seedId;
        $scope.seeds = SeedListService.query();
        $scope.isConnected = UserService.isConnected;
    }
]);

growboxControllers.controller('SeedCtrl', ['$scope', '$routeParams', 'SeedService', 'UserService',
    function ($scope, $routeParams, SeedService, UserService) {
        $scope.seed = SeedService.get({seedId: $routeParams.seedId}, function (seed) {
            $scope.name = seed.name;
            $scope.family = seed.family;
            $scope.desc = seed.desc;
            $scope.wikipedia = seed.wikipedia;
            $scope.image = seed.images[0];
            $scope.germination = seed.germination;
        });
        $scope.isConnected = UserService.isConnected;
    }
]);

growboxControllers.controller('HeaderCtrl', ['$scope', 'UserService', 'LoginService',
    function ($scope, UserService, LoginService) {
        $scope.email = UserService.email;
        $scope.password = UserService.password;
        $scope.isConnected = UserService.isConnected;
        $scope.logout = LoginService.logout;
    }
]);

growboxControllers.controller('LoginCtrl', ['$scope', 'LoginService',
    function ($scope, LoginService) {
        $scope.login = function (mail, pass) {
            LoginService.login(mail, pass);
        };
        $scope.logout = function () {
            LoginService.logout();
        };
    }
]);

growboxControllers.controller('ProfileCtrl', ['$scope', '$location', 'UserService',
    function ($scope, $location, UserService) {
        $scope.user = UserService.getUser();
        $scope.isConnected = UserService.isConnected;
        $scope.updateProfile = function( mail, firstname, lastname, img){
            UserService.updateProfile( mail, firstname, lastname, img);
            $location.path('/home');
        };
    }
]);

growboxControllers.controller( 'GerminationCtrl', ['$scope', 'ArduinoService',
    function($scope, ArduinoService){
        //temperature
        var _temperature = 0;
        var _brightness = 0;
        var _ventilation = 0;
        $scope.temperature = {
            id: 9,
            value: function( val ){
                if ( angular.isDefined( val ) ) {
                    var temperature = parseFloat( val );
                    _temperature = temperature > 100 ? 100 : temperature < 0 ? 0 : temperature;
                }
                return _temperature;
            }
        };
        $scope.addTemperature = function( val ){
            var temperature = parseFloat( $scope.temperature.value() ) + parseFloat( val );
            $scope.temperature.value( temperature );
        };
        //luminosité
        $scope.brightness = {
            id: 3,
            value: function( val ){
                if ( angular.isDefined( val ) ) {
                    var brightness = parseFloat( val );
                    _brightness = brightness > 100 ? 100 : brightness < 0 ? 0 : brightness;
                }
                return _brightness;
            }
        };
        $scope.addBrightness = function( val ){
            var brightness = parseFloat ( $scope.brightness.value() ) + parseFloat( val );
            console.log( brightness );
            $scope.brightness.value(brightness);
        };
        //ventilation
        $scope.ventilation = {
            id: 5,
            value: function( val ){
                if ( angular.isDefined( val ) ) {
                    var ventilation = parseFloat( val );
                    _ventilation = ventilation > 100 ? 100 : ventilation < 0 ? 0 : ventilation;
                }
                return _ventilation;
            }
        };
        $scope.addVentilation = function( val ){
            var ventilation = parseFloat( $scope.ventilation.value() ) + parseFloat( val );
            $scope.ventilation.value( ventilation );
        };
        
        $scope.sendDac = ArduinoService.sendDac;
        $scope.statusArray = [];
        $scope.A0Status = 0;
        $scope.updateStatus = function(){
            ArduinoService.getStatus();
            console.log( 'before timeout');
            setTimeout(function(){
                console.log( 'ttimeout statusArray', ArduinoService.statusArray );
                _.each( ArduinoService.statusArray, function(status){
                    console.log( 'status', status );
                    status = status.split('=');
                    if( status[0] === 'A0' ){
                        console.log( 'A0 found');
                        $scope.A0Status = status[1];
                    }
                });
                console.log('after timeout');
            },1000);
        };
    }
]);