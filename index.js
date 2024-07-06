const http = require("http");
const express = require("express");
const path = require("path");
const {Server} =require("socket.io");
const { Socket } = require("dgram");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection',(socket)=>{
    console.log("New user created");
    socket.on('usermsg',(message)=>{
        // console.log("a new message", message);
        io.emit('mymessage',message);
    })

})

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT||9000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
