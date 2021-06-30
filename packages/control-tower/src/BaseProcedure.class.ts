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
    const airplaneData =
      waypointData?.name &&
      (await this.prisma.airplane.findUnique({
        where: {
          Country_waypointName: {
            Country: waypointData.Country,
            waypointName: waypointData.name,
          },
        },
      }));
    // await Promise.all([waypointData, airplaneData])
    return {
      waypoint: waypointData,
      airplane: airplaneData,
    };
  }
  // async moveAirplane(
  //   airplaneId: string,
  //   toWaypointId: string,
  //   target?: Target
  // ) {
  //   try {
  //     assert(toWaypointId);
  //     assert(airplaneId);

  //     const newAirplane = await this.prisma.airplane.update({
  //       data: { waypointId: toWaypointId },
  //       where: { id: airplaneId },
  //     });
  //     newAirplane &&
  //     this.alertPlaneLocation(airplaneId,toWaypointId)
  //       this._socket.emit("message", {
  //         from: airplaneId,
  //         to: "Tel Aviv",
  //         content: `In ${
  //           (await this.prisma.waypoint.findUnique({
  //             where: { id: toWaypointId },
  //           }))!.name
  //         } ${target ? `for ${target}` : ""}`,
  //       });
  //     return newAirplane;
  //   } catch (error) {
  //     console.log(error);

  //     // throw new Error("54684916");
  //   }
  // }
  async moveAirplaneToWaypoinyByName(
    airplaneId: string,
    toWaypointName: string,
    target: Target = null
  ) {
    try {
      assert(toWaypointName);
      assert(airplaneId);

      const newAirplane = await this.prisma.airplane.update({
        data: { Waypoint: { connect: { name: toWaypointName } } },
        where: { id: airplaneId },
      });
      newAirplane &&
        this.alertPlaneLocation(airplaneId, toWaypointName, target);
      return newAirplane;
    } catch (error) {
      return null;
    }
  }
  // async isWaypointFree(toWaypointId: string): Promise<boolean> {
  //   assert(toWaypointId);
  //   const airplane = await this.airplaneInWaypoint(toWaypointId);
  //   return airplane ? false : true;
  // }
  async isWaypointFreeByName(toWaypointName: string): Promise<boolean> {
    assert(toWaypointName);
    const airplane = await this.airplaneInWaypointByName(toWaypointName);
    return airplane ? false : true;
  }
  // async airplaneInWaypoint(waypointId: string) {
  //   assert(waypointId);
  //   return await this.prisma.waypoint
  //     .findUnique({ where: { id: waypointId } })
  //     .Airplane();
  // }
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
    if (!waypoint.airplane && waypoint.waypoint) {
      const airplane = await this.prisma.airplane.create({
        data: {
          Waypoint: { connect: { name: waypointName } },
        },
      });
      this.alertPlaneJoin(airplane.id, waypoint!.waypoint!.name);
      return airplane;
    }
    return null;
  }
  async alertPlaneJoin(
    airplaneId: string,
    waypointName: string,
    target: Target = null
  ) {
    this.alertPlaneLocation(airplaneId, waypointName, target);
  }
  async alertPlaneLocation(
    airplaneId: string,
    waypointName: string,
    target?: Target
  ) {
    this._socket.emit("message", {
      from: airplaneId,
      to: "Tel Aviv",
      content: `In ${waypointName} ${target ? `for ${target}` : ""}`,
    });
  }
}
