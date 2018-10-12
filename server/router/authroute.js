var express=require('express');// express helps to run all the CRUID methods and run mongoose
var router=express.Router();

var users=require('../controller/userController');
var auth=require('../authentication')

router.get('/users/:id/userList',auth,users.allUsers);
module.exports=router;