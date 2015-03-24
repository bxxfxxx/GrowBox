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
        $scope.updateProfile = function (mail, firstname, lastname, img) {
            UserService.updateProfile(mail, firstname, lastname, img);
            $location.path('/home');
        };
    }
]);

growboxControllers.controller('GerminationCtrl', ['$scope', 'ArduinoService',
    function ($scope, ArduinoService) {
        //Controleurs
        //temperature
        var _temperature = 0;
        var _brightness = 0;
        var _ventilation = 0;
        $scope.temperature = {
            id: 9,
            value: function (val) {
                if (angular.isDefined(val)) {
                    var temperature = parseFloat(val);
                    _temperature = temperature > 100 ? 100 : temperature < 0 ? 0 : temperature;
                }
                return _temperature;
            }
        };
        $scope.addTemperature = function (val) {
            var temperature = parseFloat($scope.temperature.value()) + parseFloat(val);
            $scope.temperature.value(temperature);
        };
        //luminosité
        $scope.brightness = {
            id: 3,
            value: function (val) {
                if (angular.isDefined(val)) {
                    var brightness = parseFloat(val);
                    _brightness = brightness > 100 ? 100 : brightness < 0 ? 0 : brightness;
                }
                return _brightness;
            }
        };
        $scope.addBrightness = function (val) {
            var brightness = parseFloat($scope.brightness.value()) + parseFloat(val);
            console.log(brightness);
            $scope.brightness.value(brightness);
        };
        //ventilation
        $scope.ventilation = {
            id: 5,
            value: function (val) {
                if (angular.isDefined(val)) {
                    var ventilation = parseFloat(val);
                    _ventilation = ventilation > 100 ? 100 : ventilation < 0 ? 0 : ventilation;
                }
                return _ventilation;
            }
        };
        $scope.addVentilation = function (val) {
            var ventilation = parseFloat($scope.ventilation.value()) + parseFloat(val);
            $scope.ventilation.value(ventilation);
        };

        //Appels des services arduino
        $scope.sendDac = ArduinoService.sendDac;

        //Capteurs arduino
        $scope.sensors = {};

        /* Pour ajouter un capteur
         * reproduire le code à partir d'ici 
         * dans cet exemple, le capteur s'appelle brightness 
         * et il porte l'id 'A0' qui correspond à son id dans l'arduino 
         * recopie tout le code et mets à jour l'id et les noms brightness et _brightnessSensor (toutes les occurences) */
        var _brightnessSensor = 0;
        $scope.sensors.brightness = {
            id: 'A0',
            value: function (val) {
                if (angular.isDefined(val)) {
                    _brightnessSensor = val;
                }
                return _brightnessSensor;
            }
        };
        /* jusqu'ici */

        $scope.updateStatus = function () {
            ArduinoService.getStatus();
            setTimeout(function () {
                _.each(ArduinoService.statusArray, function (status) {
                    status = status.split('=');
                    var dacId = status[0];
                    var dacValue = status[1];
                    var foundSensor = _.find($scope.sensors, {id: dacId});
                    if (foundSensor) {
                        foundSensor.value(dacValue);
                    }
                });
            }, 200);
        };
    }
]);