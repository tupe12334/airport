import { Router } from "express";
import PrismaInstanse from "../utils/prisma.service";
import waypointService from "./waypoint.service";

let WaypointController = Router();

WaypointController.get("/isW1open", async (req, res, next) => {
  res.json(await waypointService.isW1open());
});
WaypointController.get("/all", async (req, res, next) => {
  res.json(await waypointService.getAllWaypoints());
});

export default WaypointController;
