var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb',{ useNewUrlParser: true });
var mongoSchema = mongoose.Schema;
var messageSchema = {

    'message': {
        type: String,
        required: true

    },
    // sendFrom:{
    //     type:String,
    //     required: true

    // },
    // sendTo: {
    //     type: String,
    //     required: true

    // },
    'time': {
        type: String,
        required: true
    },
    'username':{
        type:String,
        require:true

    }



}
module.exports=mongoose.model('messages',messageSchema)
