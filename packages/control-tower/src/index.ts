import express from "express";
import PrismaInstanse from "./utils/prisma.service";
import { Prisma } from "@prisma/client";
import WaypointController from "./waypoint/waypoint.controller";
import AirplaneController from "./airplane/airplane.controller";
import ControlTowerCommunication from "./utils/socket";
ControlTowerCommunication.Socket;
const seed = require("./seed");
require("dotenv-expand")(require("dotenv").config());
const app = express();
app.get("/ping", (req, res) => {
  res.send("work");
});
app.use("/" + Prisma.ModelName.Waypoint, WaypointController);
app.use("/" + Prisma.ModelName.Airplane, AirplaneController);

app.listen(process.env.PORT, () => {
  console.log(`listen in http://localhost:${process.env.PORT}`);
});
