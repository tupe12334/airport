import { BaseProcedure } from "../BaseProcedure.class";
import PrismaInstanse from "../utils/prisma.service";

class WaypointService extends BaseProcedure {
  constructor() {
    super();
  }
  async isW1open() {
    const W1 = await PrismaInstanse.waypoint
      .findFirst({ where: { name: "W1" } })
      .Airpalne();
    // console.log(W1);

    return W1 ? false : true;
  }
  async getAllWaypoints() {
    return await PrismaInstanse.waypoint.findMany();
  }
  async getAirplaneInWaypoint(waypointName: string) {
    return await PrismaInstanse.waypoint
      .findUnique({ where: { name: waypointName } })
      .Airpalne();
  }
  async getWaypointsOfProcedure(procedure: string) {
    switch (procedure) {
      case "SID":
        return await this.prisma.waypoint.findMany({
          where: { sIDId: { not: null } },
        });

      case "ILS":
        return await this.prisma.waypoint.findMany({
          where: { iLSId: { not: null } },
        });

      case "Ground":
        return await this.prisma.waypoint.findMany({
          where: { groundId: { not: null } },
        });
      default:
        break;
    }
  }
}

export default new WaypointService();
