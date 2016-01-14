'use strict';

(function () {

    angular.module('WeatherReportApp', ['ngRoute']).
        config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/', {
            templateUrl: 'partials/home',
            controller: 'WeatherReportController'
        }).
            when('/details/:cityID/:dayIndex', {
            templateUrl: 'partials/details',
            controller: 'WeatherReportDetailsController'
        }).
            otherwise({
            redirectTo: '/'
        })

    }]).
        controller('WeatherReportController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $rootScope.selectedCity = null; // initialize select tag when option is not selected
        $scope.cities = [
            {city: 'Abuja', state: 'Abuja'}, {city: 'Umuahia', state: 'Abia'}, {city: 'Yola', state: 'Adamawa'},
            {city: 'Awka', state: 'Anambra'}, {city: 'Uyo', state: 'Akwa Ibom'},
            {city: 'Bauchi', state: 'Bauchi'}, {city: 'Yenagoa', state: 'Bayelsa'}, {city: 'Makurdi', state: 'Benue'},
            {city: 'Maiduguri', state: 'Borno'}, {city: 'Calabar', state: 'Cross River'}, {city: 'Asaba', state: 'Delta'},
            {city: 'Abakaliki', state: 'Ebonyi'}, {city: 'Enugu', state: 'Enugu'}, {city: 'Benin', state: 'Edo'},
            {city: 'Ado Ekiti', state: 'Ekiti'}, {city: 'Gombe', state: 'Gombe'}, {city: 'Owerri', state: 'Imo'},
            {city: 'Dutse', state: 'Jigawa'}, {city: 'Kaduna', state: 'Kaduna'}, {city: 'Birnin Kebbi', state: 'Kebbi'},
            {city: 'Lokoja', state: 'Kogi'}, {city: 'Ilorin', state: 'Kwara'}, {city: 'Lagos', state: 'Lagos'},
            {city: 'Lafia', state: 'Nasarawa'}, {city: 'Minna', state: 'Niger'}, {city: 'Abeokuta', state: 'Ogun'}, {city: 'Akure', state: 'Ondo'},
            {city: 'Jos', state: 'Plateau'}, {city: 'Port Harcourt', state: 'Rivers'}, {city: 'Sokoto', state: 'Sokoto'},
            {city: 'Jalingo', state: 'Taraba'}, {city: 'Damaturu', state: 'Yobe'}, {city: 'Gusau', state: 'Zamfara'},
        ];

        // fetch weather report
        $scope.fetchWeatherReport = function (selectedCity) {
            $scope.loading = "Fetching data, please wait...";
            $scope.weatherReport = null;

            if (!selectedCity) {
                $scope.weatherReport = [];
                return;
            }

            var apiKey = 'YOUR_API_KEY';
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + encodeURIComponent(selectedCity) + ',ng&units=metric' +
                '&cnt=7&appid=' + apiKey + '&callback=JSON_CALLBACK';

            $http.jsonp(url).
                success(function (data, status, headers, config) {
                    $scope.weatherReport = data;
                    sessionStorage.setItem(data.city.id, JSON.stringify(data)); // cache results
                    $scope.loading = null;
            }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
        };

        // convert unix date to readable date
        $scope.convertToDate = function (unixDate) {
            return new Date(unixDate * 1000).toDateString();
        };

    }]).
        controller('WeatherReportDetailsController', ['$scope', '$rootScope', '$routeParams', '$http',
            function ($scope, $rootScope, $routeParams, $http) {

                $scope.dayIndex = $routeParams.dayIndex; // index of day in returned list array
                $scope.weatherReportDetails = JSON.parse(sessionStorage.getItem($routeParams.cityID));

                // convert unix date to readable date
                $scope.convertToDate = function (unixDate) {
                    return new Date(unixDate * 1000).toDateString();
                };

                $scope.nightIcon = function (icon) {
                    return icon.substring(0, 2);
                }
    }]);

})();