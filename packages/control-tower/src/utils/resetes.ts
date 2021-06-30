import PrismaInstanse from "./prisma.service";
import socket from "./socket";

export async function reset() {
  console.log("reset airplanes");
  await PrismaInstanse.airplane.deleteMany();
  socket.Socket.emit("message", { from: "Tel Aviv", content: "reset" });
}
export async function hardReset() {
  console.log("hard reset");
  reset();
  await PrismaInstanse.waypoint.deleteMany();
  await PrismaInstanse.sID.deleteMany();
  await PrismaInstanse.iLS.deleteMany();
  await PrismaInstanse.airport.deleteMany();
  await PrismaInstanse.ground.deleteMany();
  await PrismaInstanse.controller.deleteMany();
  socket.Socket.emit("message", { from: "Tel Aviv", content: "hard reset" });
  const seed = require("../seed");
}
