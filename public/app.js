var myApp = angular.module('myApp', ['ui.router','loginController','registerController','homeController','singleChatController','btford.socket-io']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/register');

    $stateProvider


        .state('register', {                  // linnking your registration page
            url: '/register',
            templateUrl: 'template/registration.html',
            controller:'registerCtrl'
        })


        .state('login', {                      // linking your login page.
            url: '/login',
            templateUrl: 'template/login.html',
            controller:'loginCtrl'

        })
        .state('home',{
            url:'/home',
            templateUrl:'template/home.html',
            controller:'homeCtrl'
        })
        .state('singleChat',{
            url: '/singleChat',
            templateUrl:'template/1to1home.html',
            controller:'singleChatCtrl'
        })

});

myApp.service('SocketService',['socketFactory',function SocketService(socketFactory){
    return socketFactory({
        ioSocket:io.connect('http://localhost:5005')

    });
}]);