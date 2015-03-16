growboxApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/home', {
                    templateUrl: 'snippet/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/infos', {
                    templateUrl: 'snippet/seeds-list.html',
                    controller: 'SeedListCtrl'
                })
                .when('/infos/:seedId?', {
                    templateUrl: 'snippet/seed.html',
                    controller: 'SeedCtrl'
                })
                .when('/login', {
                    templateUrl: 'snippet/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/profile', {
                    templateUrl: 'snippet/profile.html',
                    controller: 'ProfileCtrl'
                })
                .when('/germination/current', {
                    templateUrl: 'snippet/current-germination.html'
                })
                .otherwise({
                    redirectTo: '/home'
                });

    }]);