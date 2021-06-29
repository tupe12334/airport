import PrismaInstanse from "../utils/prisma.service";

class WaypointService {
  constructor() {}
  async isW1open() {
    const W1 = await PrismaInstanse.waypoint
      .findFirst({ where: { name: "W1" } })
      .Airpalne();
    return W1 ? false : true;
  }
}
export default new WaypointService();
