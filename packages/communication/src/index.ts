import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import PrismaInstanse from "./utils/prisma.service";
import { Message } from "@prisma/client";
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
  socket.on("message", async function (data: Message) {
    io.emit("message", data);
    const lowerContent = data.content.toLowerCase();
    // console.log(data.content + " from " + data.from);
    // await PrismaInstanse.message.create({
    //   data: data,
    // });
    if (data.to === "Communication" && data.content === "radio check") {
      io.emit("message", {
        to: name,
        from: "Communiction",
        content: "Loud and clear",
      });
    } else if (lowerContent.includes("moving")) {
      const movingTo = lowerContent.substr(lowerContent.indexOf("to"));
      socket.join(movingTo);
    }
  });
  socket.on("meta", (meta) => {
    name = meta.name;
  });
});

http.listen(Number(process.env.PORT), () => {
  console.log("listen on: " + process.env.PORT);
});
