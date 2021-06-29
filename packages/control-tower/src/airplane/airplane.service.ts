import PrismaInstanse from "../utils/prisma.service";
import waypointService from "../waypoint/waypoint.service";

class AirplaneService {
  constructor() {}
  async addAirplaneToW1() {
    const isOpen = await waypointService.isW1open();
    return (
      isOpen &&
      PrismaInstanse.airplane.create({
        data: { Waypoint: { connect: { name: "W1" } } },
      })
    );
  }
}
export default new AirplaneService();
