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
        if (await this.isWaypointFreeByName(waypoints[i + 1].name)) {
          const airplane = await this.airplaneInWaypointByName(waypoint.name);
          if (airplane) {
            console.log(airplane);
            this.moveAirplaneToWaypoinyByName(
              airplane!.id,
              waypoints[i + 1].name
            );
          }
        }
      }
      const airplaneInFinal = await await this.airplaneInWaypointByName(
        waypoints[waypoints.length - 1].name
      );

      if (airplaneInFinal) {
        const airplaneInRunway = await this.airplaneOfRunway();
        if (!airplaneInRunway) {
          await sleep(1000);
          this.moveAirplaneToWaypoinyByName(
            airplaneInFinal.id,
            (await this._runway)!.name,
            "Landing"
          );
        }
      }
    }, 10000);
  }
}
export default new ILS();
