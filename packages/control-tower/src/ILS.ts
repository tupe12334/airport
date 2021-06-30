import { BaseProcedure } from "./BaseProcedure.class";
import socket from "./utils/socket";
import { sleep } from "./utils/time";

class ILS extends BaseProcedure {
  private _ils = this.prisma.iLS.findFirst();
  private _waypoints = this._ils.waypoints_by_order();
  constructor() {
    super();
    setInterval(async () => {
      const [waypoints, ils] = await Promise.all([this._waypoints, this._ils]);
      for (let i = waypoints.length - 2; i >= 0; i--) {
        const waypoint = waypoints[i];
        if (await this.isWaypointFree(waypoints[i + 1].id)) {
          const airplane = await this.airplaneInWaypoint(waypoint.id);
          if (airplane) {
            console.log(airplane);
            this.moveAirplane(airplane!.id, waypoints[i + 1].id);
          }
        }
      }
      const airplaneInFinal = await await this.airplaneInWaypoint(
        waypoints[waypoints.length - 1].id
      );

      if (airplaneInFinal) {
        const airplaneInRunway = await this.airplaneOfRunway();
        if (!airplaneInRunway) {
          await sleep(1000);
          this.moveAirplane(
            airplaneInFinal.id,
            (await this._runway)!.id,
            "Landing"
          );
        }
      }
    }, 10000);
  }

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
