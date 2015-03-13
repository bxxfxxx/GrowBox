(function () {
    var app = angular.module('header-directive', []);
    app.directive("growboxHeader", function() {
        return {
            restrict: 'E',
            templateUrl: './snippet/header.html',
            controller: 'HeaderCtrl'
        };
    });
    
    app.directive("seedsMenu", function(){
       return {
           restrict:'E',
           templateUrl: './snippet/seeds-menu.html',
           controller: 'SeedListCtrl'
       };
    });
    
    app.directive("profilePanel", function(){
       return {
           restrict:'E',
           templateUrl: './snippet/profile-panel.html',
           controller: 'ProfileCtrl'
       };
    });
})();