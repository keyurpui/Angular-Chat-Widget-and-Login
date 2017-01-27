/**
 * Created by keyur on 9/17/2016.
 */
// create the module and name it scotchApp
var app1 = angular.module('newApp', ['ngRoute']);
// configure our routes
app1.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController',
            isAuthenticationRequired:true
        })
        .when('/home', {
            templateUrl : 'pages/nav.html',
            controller  : 'navCtl',
            isAuthenticationRequired:true
        })
        .when('/jemes', {
            templateUrl : 'pages/jemes.html',
            controller  : 'popupCtl',
            isAuthenticationRequired:true
        })
        .when('/megan', {
            templateUrl : 'pages/megan.html',
            controller  : 'popupCtl',
            isAuthenticationRequired:true
        })
        .when('/mindycard', {
            templateUrl : 'pages/MeganCard.html',
            controller  : 'popupCtl',
            isAuthenticationRequired:true
        })
        .when('/mindy', {
            templateUrl : 'pages/mindy.html',
            controller  : 'popupCtl',
            isAuthenticationRequired:true
        })

        .otherwise({ redirectTo: '/home' });
});
// create the controller and inject Angular's $scope
app1.controller('mainController', function($scope, $http,$location,$rootScope) {
    var islogin = localStorage.getItem("login");
    $rootScope.isLogin = islogin;
    if(!islogin)
    {
        $location.path("/");
    }

    $scope.logout = function(){
        $rootScope.isLogin = false;
        localStorage.removeItem("login");
        $location.path("/");
    }
    });
app1.controller('navCtl',function(){

});
app1.controller('popupCtl',function(){

});
app1.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    return {
        login : function(username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated : function() {
            return isAuthenticated;
        }
    };
});

app1.controller('loginController', function($scope, $rootScope,$location, LoginService ) {
    var islogin = localStorage.getItem("login");
    if(islogin)
    {
        $location.path("/home");
    }
    $rootScope.title = "AngularJS Login Sample";
    $scope.formSubmit = function() {
        if(LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $rootScope.isLogin = true;
            localStorage.setItem("login",true);
            $location.path("/home");

        } else {
            $scope.error = "Incorrect username/password !";
        }
    };
});

app1.directive('sideMenu', function() {
    return {
        templateUrl: 'pages/sideBar.html'
    };
});

app1.directive('topMenu', function() {
    return {
        templateUrl: 'pages/topMenu.html'
    };
});