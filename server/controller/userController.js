

exports.allUsers=function(req,res){
    var usermod=require('../model/user');
    var db=new usermod();
    //var response={};
    var resp={};
    var userId=req.params.id;
    console.log(userId);
    usermod.find({_id: { $ne:userId }},function(err,result){

        if(err)
        {
            response={
                "sucess":false,
                "message":"error finding data"
            };
            return res.status(404).send(err);
        }else{
            response={
                "sucess":true,
                "message":result
            }
        }
        var userList=new Array();
        for(var i=0;i<response.message.length;i++)
        {
            
                userList.push({Fullname: (response.message[i].fname+' '+response.message[i].lname), Email:
            (response.message[i].email),ID:response.message[i].id
        })
            
        }
        
        resp={
            "user":userList
            
            
        }
        // console.log($scope.userList);
        
        return res.status(200).json(resp);

    })
}
    exports.message=function(message,time,username){
        var messageMod=require('../model/message');

        var messageDb=new messageMod();
        var response={};

        messageDb.message=message;

        messageDb.time=time;
        messageDb.username=username;
    
        messageDb.save(function(err){
            if(err){
                response={
                    "sucess":false,
                    "message":"not added",
                    "err":err
                };
            }else{
                response={
                    "sucess":true,
                    "message":"Sucessfully sent",
                    
            };
        }
            console.log(response)

        });
    }
    exports.messageHistory=function(req,res)
    {
        var messageMod=require('../model/message');
       
        var response={};

        messageMod.find({},function(err,result){
          //  console.log(result);
            
           //    console.log(err);
            
            if(err)
            {
                response={
                    "success":false,
                    "message":"error getting data"
                };
                return res.status(400).send(response);
            }else{
                response={
                    "success":true,
                    "message":result
                }
            }
            return res.status(200).send(response);
        })
    }

exports.singleMessageSaving=function(message,senderId,recieverId,senderName,recieverName,time){
        var messageMod=require('../model/singlemessage');

        var messageDb=new messageMod();
        

        messageDb.message=message;
        messageDb.senderId=senderId;
        messageDb.recieverId=recieverId;
        messageDb.senderName=senderName;
        messageDb.recieverName=recieverName;
        messageDb.time=time;
    
        messageDb.save(function(err){
            if(err){
                response={
                    "sucess":false,
                    "message":"not added",
                    "err":err
                };
            }else{
                response={
                    "sucess":true,
                    "message":"Sucessfully sent",
                    
            };
        }
            console.log(response)

        });
    }
exports.singlemessageDisplay=function(req,res){
        

        var messageMod=require('../model/singlemessage');
       
        var response={};
        var recieverId=req.params.recieverId;
        var senderId=req.params.senderId;

        messageMod.find({$or:[{'recieverId':recieverId,'senderId':senderId},{'recieverId':senderId,'senderId':recieverId}]},function(err,result){
         
            if(err)
            {
                response={
                    "success":false,
                    "message":"error getting data"
                };
               
            }else{
                response={
                    "success":true,
                    "message":result
                }
            }
            return res.status(200).send(response);
        });
    }

