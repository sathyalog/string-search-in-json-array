var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$q'];
/* @ngInject */
function dataservice($http, $q) {

    var service = {
        getJson: getJson
    };
    return service;

    function getJson() {

        var newurl = 'assets/food.json';
        return $http.get(newurl)
            .then(success)
            .catch(fail);

        function success(response) {
            return response.data.recipes;
        }

        function fail(error) {
            var msg = 'query for retrieving json failed. ',
                error;
            console.log(msg);
            return $q.reject(msg);
        }
    }
};

myApp.controller('SearchController', ['$scope', 'dataservice', function($scope, dataservice) {

    $scope.name = "sathya";
    $scope.data = [];
    $scope.favorites = [];
    var id = 0;
    var listTitles = [];
    getData();

    function getData() {
        dataservice.getJson().then(function(response) {
            $scope.data = response;
            console.log($scope.data);
        });
        localStorage.clear();
    }

    $scope.matchWord = function(value) {
        $scope.results = [];
        $scope.flag = false;
        var searchVal = value.toLowerCase();
        for (var i = 0; i < $scope.data.length; i++) {
            var str = $scope.data[i].title.toLowerCase();
            if (str.search(searchVal) != -1) {
                $scope.results.push($scope.data[i]);
                $scope.flag = true;
            }

        }
        if ($scope.flag != true) {
            $scope.flag = false;
        }

    }
    $scope.addFav = function(title) {
        var getTitle = title;
        listTitles.push(getTitle);
        id++;
        localStorage.setItem("savedData", listTitles);
        var objects = [];

    }


}])

myApp.controller('SrchController', ['$scope', 'dataservice', function($scope, dataservice) {


    $scope.data = [];
    $scope.favorites = [];
    var id = 0;
    var listTitles = [];
    getData();

    function getData() {
        dataservice.getJson().then(function(response) {
            $scope.data = response;
            console.log($scope.data);
        });
        localStorage.clear();
    }
    $scope.addFav = function(title) {
        var getTitle = title;
        listTitles.push(getTitle);
        id++;
        localStorage.setItem("savedData", listTitles);
        var objects = [];

    }

}])

myApp.controller('FavController', ['$scope', 'dataservice', function($scope, dataservice) {

    loadLS();
    function loadLS(){
    $scope.objects = localStorage.getItem("savedData");
    console.log($scope.objects);
    $scope.final = $scope.objects.split(",");
    }

    $scope.removeFav= function(title){
       var abc = [];
       xyz = localStorage.getItem('savedData');
       abc = xyz.split(",")
        var index = abc.indexOf(title);
        if (index > -1) {
            abc.splice(index, 1);
            localStorage["savedData"] = abc;
            loadLS();
        }
    }



}])

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/favorites', {
            templateUrl: 'favorites.html',
            controller: 'FavController'
        }).

        otherwise({
            redirectTo: '/'
        });
    }
]);
