exports=function ConnectDB(){
    console.login("in");
    var mongoDB='mongodb://localhost:27017/demoDb';
    mongoose.connect(mongoDB);

    mongoose.connection.on('open',function(){
        console.log(console,'sucessfull:')
    });
    mongoose.connection.on('error',function(){
        console.error.bind(console,'MongoDB connection error:')
    });
}