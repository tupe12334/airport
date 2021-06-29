import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import PrismaInstanse from "./utils/prisma.service";
import MessageParser from "./utils/MessageParser";
import cors from "cors";
require("dotenv").config();
const socketIO = require("socket.io");

const app = express();
app.use(cors());

const http = createServer(app);
const io = new Server(http);
io.on("connection", function (socket) {
  console.log("A user connected");
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });

  socket.on("ping", async function (data) {
    console.log(data.content + " from " + data.from);
    await PrismaInstanse.messege.create({
      data: data,
    });
  });
});

http.listen(Number(process.env.PORT), () => {
  console.log("listen on: " + process.env.PORT);
});
