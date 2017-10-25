var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var userNickname;

var usersNameList = new Array();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    var usersIdList = Object.keys(io.sockets.sockets);
    //user connected
   console.log('a user connected');
    console.log(usersIdList);
    console.log(socket.id);
    // user disconnected
    socket.on('disconnect', function(usersNameList, usersNameList) {
        let pos = usersIdList.indexOf(socket.id);
//        var removed = usersNameList.splice(pos, 1);
//        usersIdList = usersIdList.splice(pos, 1);
        
        console.log(socket.nickname + ' disconnected' + usersNameList + usersIdList);
        io.emit('user disconnected', usersNameList)
    });
    
    // Nickname setting
    socket.on('set nickname', function(nickname){
        socket.nickname = nickname;
        
        // tutaj jakas petla by sie przydala, zeby sprawdzic rownosc id, bo ktos moze sie polaczyc, ale nie wpisac imienia
        if(usersIdList[usersIdList.length-1] == socket.id){
            usersNameList.push(socket.nickname);
        }
        console.log(usersNameList);
        console.log('Connected: ' + this.nickname);
        io.emit('nickname ready', socket.nickname, usersNameList);
    });
    
    //user message to render
    socket.on('chat message', function(msg){
        console.log('message by ' + socket.nickname + ': ' + msg);
        io.emit('chat message', msg, socket.nickname);
    });
    
    
});


http.listen('3000', function(){
    console.log('listening on *:3000');
});
