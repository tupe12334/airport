import express from "express";
import PrismaInstanse from "./utils/prisma.service";
import { Prisma } from "@prisma/client";
import WaypointController from "./waypoint/waypoint.controller";
import AirplaneController from "./airplane/airplane.controller";
import ControlTowerCommunication from "./utils/socket";
import cors from "cors";
import ILS from "./ILS";
import Ground from "./Ground";
import socket from "./utils/socket";
import { hardReset, reset } from "./utils/resetes";
ControlTowerCommunication.Socket;
const seed = require("./seed");
require("dotenv-expand")(require("dotenv").config());
const app = express();
app.use(cors());
app.get("/ping", (req, res) => {
  res.send("work");
});

Ground;
app.post("/reset", async (req, res) => {
  reset();
});
app.post("/hardreset", async (req, res) => {
  hardReset();
});
app.use("/" + Prisma.ModelName.Waypoint, WaypointController);
app.use("/" + Prisma.ModelName.Airplane, AirplaneController);

app.listen(process.env.PORT, () => {
  console.log(`listen in http://localhost:${process.env.PORT}`);
});
setInterval(async () => {
  // console.log(await ILS.getStateOfWaypoint("W1"));
  // const [waypoints, ils, ils1Waypoints] = await getAllWaypoints();
  // for (let i = 0; i < ils1Waypoints.length - 1; i++) {
  //   const waypoint = ils1Waypoints[i];
  //   const airplane = await PrismaInstanse.airplane.findFirst({
  //     where: { waypointId: waypoint.id },
  //   });
  //   // airplane?.id &&
  //   //   moveAirplaneForward(airplane.id, i, ils1Waypoints[i + 1]?.id);
  // }
}, 1000);
