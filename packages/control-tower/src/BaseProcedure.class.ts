import assert from "assert";
import { Target } from "./types";
import PrismaInstanse from "./utils/prisma.service";
import socket from "./utils/socket";

export class BaseProcedure {
  _socket = socket.Socket;
  constructor(protected prisma = PrismaInstanse) {
    console.log("Create " + this.constructor.name);
  }
  _runway = this.prisma.waypoint.findUnique({ where: { name: "Runway" } });
  async getStateOfWaypoint(name: string) {
    const waypointData = await this.prisma.waypoint.findUnique({
      where: { name: name },
    });
    const airplaneData = await this.prisma.airplane.findUnique({
      where: { waypointId: waypointData!.id },
    });
    return {
      waypoint: waypointData,
      airplane: airplaneData,
    };
  }
  async moveAirplane(
    airplaneId: string,
    toWaypointId: string,
    target?: Target
  ) {
    try {
      assert(toWaypointId);
      assert(airplaneId);

      const newAirplane = await this.prisma.airplane.update({
        data: { waypointId: toWaypointId },
        where: { id: airplaneId },
      });
      newAirplane &&
        this._socket.emit("message", {
          from: airplaneId,
          to: "Tel Aviv",
          content: `In ${
            (await this.prisma.waypoint.findUnique({
              where: { id: toWaypointId },
            }))!.name
          } ${target ? `for ${target}` : ""}`,
        });
      return newAirplane;
    } catch (error) {
      console.log(error);

      // throw new Error("54684916");
    }
  }
  async isWaypointFree(toWaypointId: string): Promise<boolean> {
    assert(toWaypointId);
    const airplane = await this.airplaneInWaypoint(toWaypointId);
    return airplane ? false : true;
  }
  async airplaneInWaypoint(waypointId: string) {
    assert(waypointId);
    return await this.prisma.waypoint
      .findUnique({ where: { id: waypointId } })
      .Airpalne();
  }
  async airplaneOfRunway() {
    return await this.prisma.waypoint
      .findUnique({ where: { name: "Runway" } })
      .Airpalne();
  }
  async removeAirplane(airplaneId: string) {
    try {
      await this.prisma.airplane.delete({ where: { id: airplaneId } });
      this.alertAirplaneRemoval(airplaneId);
    } catch (error) {}
  }
  async alertAirplaneRemoval(airplaneId: string) {
    this._socket.emit("message", {
      from: airplaneId,
      to: "Tel Aviv",
      content: "Disconnecting, good day",
    });
  }
  async addPlaneToWaypoint(waypointName: string) {
    const waypoint = await this.getStateOfWaypoint(waypointName);
    if (!waypoint.airplane) {
      const airplane = await this.prisma.airplane.create({
        data: { Waypoint: { connect: { name: waypointName } } },
      });
      this.alertPlaneLocation(airplane.id, waypoint!.waypoint!.name);
      return airplane;
    }
    return null;
  }
  async alertPlaneLocation(airplaneId: string, waypointName: string) {
    this._socket.emit("message", {
      from: airplaneId,
      to: "Tel Aviv",
      content: `In ${waypointName}`,
    });
  }
}
