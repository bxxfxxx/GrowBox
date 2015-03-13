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