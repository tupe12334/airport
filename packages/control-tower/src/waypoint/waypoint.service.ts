import PrismaInstanse from "../utils/prisma.service";

class WaypointService {
  constructor() {}
  async isW1open() {
    const W1 = await PrismaInstanse.waypoint
      .findFirst({ where: { name: "W1" } })
      .Airpalne();
    console.log(W1);

    return W1 ? false : true;
  }
  async getAllWaypoints() {
    return await PrismaInstanse.waypoint.findMany();
  }
}

export default new WaypointService();
