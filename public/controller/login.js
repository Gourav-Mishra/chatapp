var app=angular.module('loginController',[])
app.controller('loginCtrl',function($scope,$http,$state){
    if(localStorage.getItem('token')!=null)
    {
        $state.go('home')
    }
    
    $scope.user={
        'email' : '',
        'password' : '',

    }
console.log($scope.user);
$scope.login=function(){
    console.log("login calling",$scope.user);
    $http({
        method :'POST',
        url: '/login',
        data: $scope.user
    }).then(function(response){
        console.log(response.data.message);
        if(response.data.Success==true){
            $scope.message="Login sucessfull";
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('uname',response.data.username);

            $state.go('home')
        }
        else if(response.data.Success==false){
            $scope.message="Login unsucessfull"
        }
    })
}
 });
