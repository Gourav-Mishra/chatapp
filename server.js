var express     =   require("express"); // systems server for an instance 
var app         =   express();
var bodyParser  =   require("body-parser");

var server = require('http').Server(app);
var io = require('socket.io')(server);
var users=require('./server/controller/userController')

app.use(bodyParser.json());
/**
 * body-parser parses your request and converts it into a format,
   from which you can easily extract relevant information that you may need.
*/
app.use(bodyParser.urlencoded({"extended" : false}));
/**
 * basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false),
   or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
 */

var router = require(`./server/router/route`)

app.use('/',router);

server.listen(5005);

console.log("Listening to PORT 5005");
app.use(express.static('./public'))


    io.on('connection', (socket) => {
        console.log("New User Connected");
        //socket.email="abc@abc.com";
    
        socket.on('new_message', (data) => {
            io.sockets.emit('new_message', 'All set')
        });
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', 'anonymous')
        });
    });




io.on('connection', function(client){

    console.log(" User is Connected")
    client.on('disconnect', function(){

        console.log('user disconnected')
    });
    client.on('toBackEnd',function(data){
        users.message(data.message,data.time,data.username)
        io.emit('message',data);
    })
    client.on('singleChatBackend',function(data){
        users.singleMessageSaving(data.message,data.senderId,data.recieverId,data.senderName,data.recieverName,data.time)
        io.emit(data.recieverId,data)
    });


});