var jwt = require('jsonwebtoken');
const secret = "sdsfzfdgxfhgjijok3456768990";
var response={
    "message":"authentication Failed"
}
var auth=function(req,res,next)
{
    var token=req.headers['token'];
    jwt.verify(token,secret,function(err,result){
        if (err){
            return res.status(401).send(response);
        }else{
            console.log(result);
            next();
        }
    })
}
module.exports=auth;