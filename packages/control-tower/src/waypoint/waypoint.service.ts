import { BaseProcedure } from "../BaseProcedure.class";
import PrismaInstance from "../utils/prisma.service";

class WaypointService extends BaseProcedure {
  constructor() {
    super();
  }
  async isW1open() {
    try {
      const W1 = await PrismaInstance.waypoint
        .findFirst({ where: { name: "W1" } })
        .Airplane();
      return W1 ? false : true;
    } catch (error) {
      return false;
    }
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
    if (procedure === "Runway") {
      return await this.prisma.runway.findMany({});
    }
    return await this.prisma.waypoint.findMany({
      where: { [procedure]: { isNot: null } },
    });
  }
}

export default new WaypointService();
