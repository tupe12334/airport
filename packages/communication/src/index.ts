import express from "express";
import { Server as SocketServer } from "socket.io";
import { createServer } from "http";
require("dotenv").config();

const app = express();

const http = createServer(app);
const io = new SocketServer(http, { cors: { origin: "*" } });
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
  socket.on("send_message", function (data) {
    socket.emit("send_message", data);
    // console.log(data);
  });
  socket.on("join_room", function (data) {
    // socket.emit("send_message", data);
    console.log(data);
  });
});

http.listen(Number(process.env.PORT), () => {
  console.log("listen on: " + process.env.PORT);
});
