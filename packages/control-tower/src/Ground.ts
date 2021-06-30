import { BaseProcedure } from "./BaseProcedure.class";
import { Messege } from "@prisma/client";
import { sleep } from "./utils/time";
class Ground extends BaseProcedure {
  private _ground = this.prisma.ground.findFirst();
  private _waypoints = this._ground.waypoints();
  constructor() {
    super();
    this.initSocket();
  }
  initSocket() {
    this._socket.on(
      "message",
      async ({ content, from, id, to, sent_at }: Messege) => {
        const freeToContion = setInterval(async () => {
          if (
            content.toLowerCase().includes("runway") ||
            content.toLowerCase().includes("k")
          ) {
            const [waypoints] = await Promise.all([this._waypoints]);
            if (content.toLowerCase().includes("runway")) {
              if (content.toLowerCase().includes("landing")) {
                await sleep(1000);
                const taxiZ = waypoints.find(
                  (waypoint) => waypoint.name === "Z"
                );
                if (taxiZ?.id) {
                  if (await this.isWaypointFree(taxiZ!.id)) {
                    clearInterval(freeToContion);
                    await this.moveAirplane(from, taxiZ.id);
                    setTimeout(() => {
                      this.removeAirplane(from);
                    }, 10000);
                  }
                }
              } else if (content.toLowerCase().includes("departure")) {
              }
            } else if (
              content.toLowerCase().includes("in") &&
              content.toLowerCase().includes("k")
            ) {
              const airplaneInRunway = await this.airplaneOfRunway();
              if (!airplaneInRunway) {
                const runway = waypoints.find(
                  (waypoint) => waypoint.name.toLowerCase() === "runway"
                );
                runway?.id && this.moveAirplane(from, runway.id, "Departure");
              }
            }
          }
        }, 1000);
      }
    );
  }
}
export default new Ground();
