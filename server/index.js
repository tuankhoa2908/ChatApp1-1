var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

require("dotenv").config();
const PORT = process.env.PORT || 8080;

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  });


socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});