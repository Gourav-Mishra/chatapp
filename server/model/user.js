var  mongoose=require ('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb',{ useNewUrlParser: true });
var mongoSchema= mongoose.Schema;
var userSchema=new mongoSchema({
    fname : 
    { 
        type : String,
        required: false
    },
    lname :
     {
          type : String,
          required:false 
     },
     email:
    { 
        type : String,
         required: true
    },
    password:
     {
         type : String,
          required: true
        },
    
    phoneNumber:
    { 
        type: String,
        required : false
    },



});
module.exports=mongoose.model('userlogins',userSchema);