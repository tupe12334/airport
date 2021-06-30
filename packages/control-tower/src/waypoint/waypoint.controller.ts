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
WaypointController.get("/:waypoint/airplane", async (req, res, next) => {
  res.json(await waypointService.getAirplaneInWaypoint(req.params.waypoint));
});
WaypointController.get("/procedure/:procedure", async (req, res) => {
  res.json(await waypointService.getWaypointsOfProcedure(req.params.procedure));
});
WaypointController.get("/name/:name", async (req, res) => {
  res.json(await waypointService.getStateOfWaypoint(req.params.name));
});
export default WaypointController;
