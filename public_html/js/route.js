growboxApp.config(['$routeProvider'],
        function ($routeProvider) {
            $routeProvider
                    .when('/home', {
                        templateUrl: 'snippet/home.html',
                        controller: 'homeCtrl'
                    })
                    .when('/germination/new', {
                        templateUrl: 'snippet/new-germination.html',
                        controller: 'newGerminationCtrl'
                    })
                    .when('/germination/current', {
                        templateUrl: 'snippet/current-germination.html',
                        controller: 'currentGerminationCtrl'
                    })
                    .when('/germination/history', {
                        templateUrl: 'snippet/history.html',
                        controller: 'historyCtrl'
                    })
                    .when('/profile', {
                        templateUrl: 'snippet/profile.html',
                        controller: 'profileCtrl'
                    })
                    .otherwise({
                        redirectTo: '/home'
                    });

        });