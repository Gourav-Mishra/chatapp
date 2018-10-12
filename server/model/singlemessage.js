var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb',{ useNewUrlParser: true });
var mongoSchema = mongoose.Schema;
var singleMessageSchema = new mongoSchema({

    'message': {
        type: String,
        required: true

    },
    'senderId':{
        type:String,
        required: true

    },
    'recieverId': {
        type: String,
        required: true

    },
    'senderName': {
        type: String,
        required: true
    },
    'recieverName':{
        type:String,
        require:true

    },
   
   ' date':{
        type: String,
        require:true
    }




});
module.exports=mongoose.model('singleMessage',singleMessageSchema)
