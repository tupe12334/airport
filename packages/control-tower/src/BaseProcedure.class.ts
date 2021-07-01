import { RF, Target } from "@prisma/client";
import assert from "assert";
import { AirplanePool } from ".";
import Airplane from "./Airplane.class";
// import { Target } from "./types";
import PrismaInstanse from "./utils/prisma.service";
import socket from "./utils/socket";

export class BaseProcedure {
  _socket = socket.Socket;
  constructor(protected prisma = PrismaInstanse) {
    console.log("Create " + this.constructor.name);
  }
  _runways = this.prisma.runway.findMany();
  async getStateOfWaypoint(name: string) {
    try {
      const waypointData = await this.prisma.waypoint.findUnique({
        where: { name: name },
      });
      const airplaneData = await this.prisma.waypoint
        .findUnique({
          where: { name: name },
        })
        .Airplane();
      return {
        waypoint: waypointData,
        airplane: airplaneData,
      };
    } catch (error) {}
  }

  async moveAirplaneToWaypointByName(
    airplaneId: string,
    toWaypointName: string,
    target: Target
  ) {
    try {
      assert(toWaypointName);
      assert(airplaneId);
      const newAirplane = await this.prisma.airplane.update({
        data: { Waypoint: { connect: { name: toWaypointName } } },
        where: { id: airplaneId },
      });
      newAirplane && AirplanePool[airplaneId].alertLocation();
      return newAirplane;
    } catch (error) {
      return null;
    }
  }

  async isWaypointFreeByName(toWaypointName: string): Promise<boolean> {
    assert(toWaypointName);
    const airplane = await this.airplaneInWaypointByName(toWaypointName);
    return airplane ? false : true;
  }

  async airplaneInWaypointByName(waypointName: string) {
    return await this.prisma.waypoint
      .findUnique({ where: { name: waypointName } })
      .Airplane();
  }
  async airplaneOfRunway() {
    return await this.prisma.waypoint
      .findUnique({ where: { name: "Runway" } })
      .Airplane();
  }
  async addPlaneToWaypoint(waypointName: string, target: Target) {
    try {
      const waypoint = await this.getStateOfWaypoint(waypointName);
      if (!waypoint?.airplane && waypoint?.waypoint) {
        const airplane = await this.prisma.airplane.create({
          data: {
            Waypoint: { connect: { name: waypointName } },
            Target: target,
            rf: waypoint!.waypoint!.rf,
          },
        });
        AirplanePool[airplane.id] = new Airplane(airplane.id);
        return airplane;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async telAirplaneToChangeRF(airplaneId: string, RF: RF) {
    this._socket.emit("message", {
      from: "Tel Aviv",
      to: airplaneId,
      content: `please move to sqwak ${RF}`,
    });
  }
  async getAirplaneInRunway(AirportName = "Ben Gurion", Diraction = 30) {
    return await this.prisma.runway.findUnique({
      where: {
        Diraction_AirportName: {
          AirportName: AirportName,
          Diraction: Diraction,
        },
      },
    });
  }
  async getRunwaysInAirport(airpoetName: string) {
    return await this.prisma.runway.findMany({
      where: { AirportName: airpoetName },
    });
  }
}
export default new BaseProcedure();
