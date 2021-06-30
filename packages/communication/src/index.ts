import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import PrismaInstanse from "./utils/prisma.service";
import MessageParser from "./utils/MessageParser";
const cors = require("cors");
require("dotenv").config();
const socketIO = require("socket.io");

const app = express();
app.use(cors({ origin: "*" }));

const http = createServer(app);
const io = new Server(http, { cors: { origin: "*" } });
// io.emit("message", "test");
io.on("connection", function (socket) {
  let name = "";
  console.log("A user connected");
  socket.on("disconnect", function () {
    io.emit("message", {
      to: name,
      from: "Communication",
      content: "Bye, good day",
    });
    console.log("A user disconnected");
  });
  socket.on("message", async function (data) {
    io.emit("message", data);
    // console.log(data.content + " from " + data.from);
    await PrismaInstanse.messege.create({
      data: data,
    });
    if (data.to === "Communication" && data.content === "radio check") {
      io.emit("message", {
        to: name,
        from: "Communiction",
        content: "Loud and clear",
      });
    }
  });
  socket.on("meta", (meta) => {
    name = meta.name;
  });
});

http.listen(Number(process.env.PORT), () => {
  console.log("listen on: " + process.env.PORT);
});
