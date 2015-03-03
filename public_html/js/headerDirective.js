(function () {
    var app = angular.module('header-directive', []);
    app.directive("growboxHeader", function () {
        return {
            restrict: 'E',
            templateUrl: './snippet/header.html',
            controller: function () {
                var header = this;
                header.user = {
                    name: '',
                    mail: '',
                    connected: false
                };
                this.isConnected = function () {
                    return header.user.connected;
                };
            },
            controllerAs: 'headerCtrl'
        };
    });
})();