import { Router } from "express";
import ILS from "../ILS";
import PrismaInstanse from "../utils/prisma.service";

let AirplaneController = Router();

AirplaneController.post("/addToW1", async (req, res, next) => {
  try {
    const airplane = await ILS.addPlaneToILS();
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.json({ work: false, meta: null });
  }
});
AirplaneController.get("/:id", async (req, res, next) => {
  try {
    const airplane = PrismaInstanse.airplane.findUnique({
      where: { id: req.params.id },
    });
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.send(null);
  }
});
export default AirplaneController;
