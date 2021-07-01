import { BaseProcedure } from "./BaseProcedure.class";
import { Message, RF } from "@prisma/client";
import { sleep } from "./utils/time";
import { AirplanePool } from ".";
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

      async ({ content, from, id, to, sent_at }: Message) => {
        const freeToContion = setInterval(async () => {
          if (
            content.toLowerCase().includes("runway") ||
            content.toLowerCase().includes("k")
          ) {
            const [waypoints] = await Promise.all([this._waypoints]);
            if (content.toLowerCase().includes("runway")) {
              if (content.toLowerCase().includes("arrive")) {
                await sleep(1000);
                const taxiZ = waypoints.find(
                  (waypoint) => waypoint.name === "Z"
                );
                if (taxiZ?.name) {
                  if (await this.isWaypointFreeByName(taxiZ!.name)) {
                    try {
                      clearInterval(freeToContion);
                      await AirplanePool[from].moveToLocation(taxiZ.name);
                      await sleep(3000);
                      await AirplanePool[from].removeSelf();
                    } catch (error) {}
                  }
                }
              } else if (content.toLowerCase().includes("departure")) {
                try {
                  const ROTEMWaypoint = await this.getStateOfWaypoint("ROTEM");
                  if (ROTEMWaypoint?.waypoint?.name) {
                    if (
                      await this.isWaypointFreeByName(
                        ROTEMWaypoint.waypoint.name
                      )
                    ) {
                      await sleep(1000);
                      AirplanePool[from].moveToLocation(
                        ROTEMWaypoint.waypoint.name
                      );
                    }
                  }
                } catch (error) {}
              }
            } else if (
              content.toLowerCase().includes("in") &&
              content.toLowerCase().includes("k")
            ) {
              const airplaneInRunway = await this.airplaneOfRunway();
              if (!airplaneInRunway) {
                try {
                  AirplanePool[from].enterToRunway();
                } catch (error) {}
              }
            }
          }
        }, 1000);
      }
    );
  }
}
export default new Ground();
