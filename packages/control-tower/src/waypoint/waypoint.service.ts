import PrismaInstanse from "../utils/prisma.service";

class WaypointService {
  constructor() {}
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
}

export default new WaypointService();
