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
import Airplane from "./Airplane.class";
import SID from "./SID";
import RunwayController from "./runway/runway.controller";
ControlTowerCommunication.Socket;
const seed = require("./seed");
require("dotenv-expand")(require("dotenv").config());
const app = express();
app.use(cors());
app.get("/ping", (req, res) => {
  res.send("work");
});
export let AirplanePool: { [key: string]: Airplane } = {};
Ground;
SID;
app.post("/reset", async (req, res) => {
  reset();
});
app.post("/hardreset", async (req, res) => {
  hardReset();
});
app.use("/" + Prisma.ModelName.Waypoint, WaypointController);
app.use("/" + Prisma.ModelName.Airplane, AirplaneController);
app.use("/" + Prisma.ModelName.Runway, RunwayController);

app.listen(process.env.PORT, () => {
  console.log(`listen in http://localhost:${process.env.PORT}`);
});
