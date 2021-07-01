import { Router } from "express";
import BaseProcedure from "../BaseProcedure.class";
import PrismaInstanse from "../utils/prisma.service";

let RunwayController = Router();

RunwayController.get("/airplane", async (req, res, next) => {
  res.json(await BaseProcedure.getAirplaneInRunway());
});
RunwayController.get("/airport/:airportName", async (req, res, next) => {
  res.json(await BaseProcedure.getRunwaysInAirport(req.params.airportName));
});
export default RunwayController;
