var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var serverNickname;


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
   console.log('a user connected');
    
    // user disconnetion
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
    //user message to console
    socket.on('chat message', function(msg){
        console.log('message: ' +msg);
    });
    
    //user message to render
    socket.on('chat message', function(msg, serverNickname){
        serverNickname = socket.nickname;
        io.emit('chat message', msg, serverNickname);
    });
    
    socket.on('set nickname', function(nickname){
        
        socket.nickname = nickname;
        serverNickname = socket.nickname;
        console.log('nazwa: ' + this.nickname);
        io.emit('nickname ready', serverNickname);
    });
});


/////////////////////
//io.listen(80).sockets.on('connection', function (socket) {
//    socket.on('set nickname', function (name) {
//        socket.set('nickname', name, function () { socket.emit('ready'); });
//    });
//
//    socket.on('msg', function () {
//        socket.get('nickname', function (err, name) {
//            console.log('Chat message by ', name);
//        });
//    });
//});

/////////////


http.listen('3000', function(){
    console.log('listening on *:3000');
});
