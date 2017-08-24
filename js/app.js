'use strict';
var testapp = angular.module('digital', ['ui.router']).

config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider,$urlRouterProvider,$locationProvider) {  
      $stateProvider
        .state("imgslide", {
            url: "/slide/:imgid",
            controller: "MainCtrl",
            templateUrl: 'views/slider.html',
            params: {
                imgid: {
                  value: "0"
                  
                } 
            }
        });
        $urlRouterProvider.otherwise('/slide/')

        //$locationProvider.html5Mode(true);
}]);

testapp.controller('MainCtrl', function ($scope,$state,$stateParams) {
  // Set of Photos
  $scope.photos = gallery.images;
  // initial image index
  $scope._Index = $stateParams.imgid;
  // if a current image is the same as requested image
  $scope.isActive = function (index) {
    return $scope._Index == index;
  };

  // show a certain image
  $scope.showPhoto = function (index) { 
    $state.go('.', {imgid: index});
    $scope._Index = index;
  };

  $scope.showPrev = function () {
      $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
      $state.go('.', {imgid: $scope._Index});
  };

    // show next image
  $scope.showNext = function () {
      $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
      $state.go('.', {imgid: $scope._Index});
  };
});