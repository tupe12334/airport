import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import PrismaInstanse from "./utils/prisma.service";
import MessageParser from "./utils/MessageParser";
require("dotenv").config();
const socketIO = require("socket.io");

const app = express();

const http = createServer(app);
const io = new Server(http);

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
  socket.on("ping", async function (data) {
    console.log(data);

    await PrismaInstanse.messege.create({
      data: MessageParser.radioCheck(data),
    });
  });
});

http.listen(Number(process.env.PORT), () => {
  console.log("listen on: " + process.env.PORT);
});
