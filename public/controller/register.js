var app=angular.module('registerController',[])
app.controller('registerCtrl',function($scope,$http){
   
    $scope.user={
        'fname' :'',
        'lname' : '',
        'email' : '',
        'password' : '',
        'phone' : '',

    }
console.log($scope.user);
$scope.register=function(){
    console.log("register calling",$scope.user);
    $http({
        method :'post',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response.data.message);
        if(response.data.Success==true){
            $scope.message="Registration sucessfull";
        }
        else if(response.data.Sucess){
            $scope.message="Registration unsucessfull"
        }
    })
}
 });
