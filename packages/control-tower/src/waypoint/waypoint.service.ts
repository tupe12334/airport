import { BaseProcedure } from "../BaseProcedure.class";
import PrismaInstance from "../utils/prisma.service";

class WaypointService extends BaseProcedure {
  constructor() {
    super();
  }
  async isW1open() {
    const W1 = await PrismaInstance.waypoint
      .findFirst({ where: { name: "W1" } })
      .Airplane();
    // console.log(W1);

    return W1 ? false : true;
  }
  async getAllWaypoints() {
    return await PrismaInstance.waypoint.findMany();
  }
  async getAirplaneInWaypoint(waypointName: string) {
    return await PrismaInstance.waypoint
      .findUnique({ where: { name: waypointName } })
      .Airplane();
  }
  async getWaypointsOfProcedure(procedure: string) {
    switch (procedure) {
      case "SID":
        return await this.prisma.waypoint.findMany({
          where: { sIDId: { not: null } },
        });

      case "ILS":
        return await this.prisma.waypoint.findMany({
          where: { ILS: { isNot: null } },
        });

      case "Ground":
        return await this.prisma.waypoint.findMany({
          where: { Ground: { isNot: null } },
        });
      default:
        break;
    }
  }
}

export default new WaypointService();
