import { BaseProcedure } from "./BaseProcedure.class";
import socket from "./utils/socket";

class ILS extends BaseProcedure {
  constructor() {
    super();
    setInterval(() => {}, 1000);
  }
  canMoveForward() {}
  async addPlaneToILS() {
    const W1 = await this.getStateOfWaypoint("W1");
    if (!W1.airplane) {
      const newAirplane = await this.prisma.airplane.create({
        data: { Waypoint: { connect: { name: "W1" } } },
      });
      socket.Socket.emit("message", {
        to: "Tel Aviv",
        from: newAirplane.id,
        content: "In W1",
      });
      return newAirplane;
    } else {
      throw new Error("565654");
    }
  }
}
export default new ILS();
