var app = angular.module('singleChatController', []);
app.controller('singleChatCtrl', function ($scope, $http, $state, SocketService) {
    var senderId = localStorage.getItem('userId');
    var senderName = localStorage.getItem('uname');
    var recieverId = localStorage.getItem('ruserId');
    var recieverName = localStorage.getItem('rusername');
    $scope.message = '';
    $scope.close = function () {
        $state.go('home');
        localStorage.removeItem('ruserId');
        localStorage.removeItem('rusername');
    }

    uname = [];
    uname.push(senderName + " : " + recieverName);
    $scope.userName = uname;

    //$scope.chatlist = [];
    var chatlist = new Array();
    $scope.send = function () {
        console.log($scope.message);
        console.log("message");

        SocketService.emit('singleChatBackend', {
            'senderId': senderId,
            'senderName': senderName,
            'recieverId': recieverId,
            'recieverName': recieverName,
            'message': $scope.message,
            'time': new Date()
        })
        $scope.chatlist.push({
                'senderId': senderId,
                'senderName': senderName,
                'recieverId': recieverId,
                'recieverName': recieverName,
                'message': $scope.message,
                'time': new Date()
            })
        $scope.message = null;
    }

    $http({


        method: 'GET',
        url: '/users/singlemessageDisplay/' + recieverId + '/and/' + senderId,

    }).then(function (response) {


        //console.log(response.data.message[0].message);
        // for (var i = 0; i < response.data.message.length; i++) {

        //     chatlist.push(response.data.message[i])
        // }
        $scope.chatlist = response.data.message;

    })

    SocketService.on(senderId, function (msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });

    $scope.currUser = senderName;

})