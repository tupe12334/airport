import { Router } from "express";
import PrismaInstanse from "../utils/prisma.service";
import airplaneService from "./airplane.service";

let AirplaneController = Router();

AirplaneController.post("/addToW1", async (req, res, next) => {
  try {
    const airplane = await airplaneService.addAirplaneToW1();
    res.json({ work: true, meta: airplane });
  } catch (error) {
    res.json({ work: false, meta: null });
  }
});
export default AirplaneController;
