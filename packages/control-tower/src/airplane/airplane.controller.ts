import { Router } from "express";
import Ground from "../Ground";
import ILS from "../ILS";
import PrismaInstanse from "../utils/prisma.service";

let AirplaneController = Router();

AirplaneController.post("/addToW1", async (req, res, next) => {
  try {
    const airplane = await ILS.addPlaneToWaypoint("W1", "Arrive");
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.json({ work: false, meta: null });
  }
});
AirplaneController.get("/id/:id", async (req, res, next) => {
  try {
    const airplane = await PrismaInstanse.airplane.findUnique({
      where: { id: req.params.id },
    });
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.send(null);
  }
});
AirplaneController.get("/name/:name", async (req, res, next) => {
  try {
    const airplane = await PrismaInstanse.airplane.findUnique({
      where: { id: req.params.name },
    });
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.send(null);
  }
});
AirplaneController.post("/add/:waypointName", async (req, res, next) => {
  try {
    res.json(
      await Ground.addPlaneToWaypoint(
        req.params.waypointName,
        req.params.waypointName === "W1" ? "Arrive" : "Departure"
      )
    );
  } catch (error) {}
});
export default AirplaneController;
