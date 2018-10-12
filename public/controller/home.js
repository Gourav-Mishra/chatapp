
var app = angular.module('homeController', []);
app.controller('homeCtrl', function ($scope, $http, $state, SocketService) {


    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
    var uname = localStorage.getItem('uname');
    $http({
        method: 'GET',
        url: 'auth/users/' + userId + '/userList',
        headers: {
            'token': token
        }
    }).then(function (response) {
        var userlist = new Array();
        //console.log(response);
        console.log(response.data.user[0])

        for (var i = 0; i < response.data.user.length; i++) {

            userlist.push(response.data.user[i])
        }
        //console.log(userlist);

        $scope.userList = userlist;

        console.log("Authentication Successful", $scope.userList);
    }, function (error) {
        console.log("Error fetching data");
    });

    $scope.logout = function () {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('uname');
        $state.go('login');

    }

    $scope.person=function(name,userId){
        localStorage.setItem('rusername',name);
        localStorage.setItem('ruserId',userId);
        $state.go('singleChat')

    }

    
    $scope.array = [];
    $scope.message = '';
    SocketService.emit('room', { roomId: "temp" });





    $scope.add = function () {
        SocketService.emit('toBackEnd', { 'message': $scope.message, 'time': new Date(), 'username': uname })
        $scope.array.push({ 'message': $scope.message, 'time': new Date(), 'username': uname })
        $scope.message = null;
    }
    $http({
        method: 'GET',
        url: '/users/messageHistory'
    }).then(function (response) {

        $scope.msgList = response.data.message;

    });

    SocketService.on('message', function (msg) {
        $scope.msgList.push(msg)
    });
    $scope.currUser = uname;



});