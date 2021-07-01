import { AirplanePool } from ".";
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
        try {
          const waypoint = waypoints[i];
          if (await this.isWaypointFreeByName(waypoints[i + 1].name)) {
            const airplane = await this.airplaneInWaypointByName(waypoint.name);
            if (airplane) {
              AirplanePool[airplane.id].moveToLocation(waypoints[i + 1].name);
            }
          }
        } catch (error) {}
      }
      const airplaneInFinal = await await this.airplaneInWaypointByName(
        waypoints[waypoints.length - 1].name
      );

      if (airplaneInFinal) {
        try {
          const airplaneInRunway = await this.airplaneOfRunway();
          if (!airplaneInRunway) {
            await sleep(1000);
            AirplanePool[airplaneInFinal.id].enterToRunway();
          }
        } catch (error) {}
      }
    }, 10000);
  }
}
export default new ILS();
