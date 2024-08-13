const express = require('express');//backend
const app = express();
const path = require('path');
const http = require('http');//socket io server
const socketio = require('socket.io');

const server = http.createServer(app);//main method or http
const io = socketio(server);

app.set("view engine", "ejs");//ejs setup
app.use(express.static(path.join(__dirname, "public"))); // public folder setup static files use kr paye 

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {//accept from scjs
        io.emit("received-location", { id: socket.id, ...data });//frontend sab logo ko location
    })
    socket.on("disconnect", function(){
        io.emit("user- disconnected",socket.id);
    });//client connects via socket io
});

app.get('/', function (req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
