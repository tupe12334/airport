import PrismaInstanse from "./utils/prisma.service";

export class BaseProcedure {
  constructor(protected prisma = PrismaInstanse) {}
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
}
