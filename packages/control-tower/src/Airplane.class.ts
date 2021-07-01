import { Message, RF, Target, Waypoint, Runway } from "@prisma/client";
import assert from "assert";
import { io } from "socket.io-client";
import { AirplanePool } from ".";
import prismaService from "./utils/prisma.service";
import PrismaInstanse from "./utils/prisma.service";
import { sleep } from "./utils/time";

export default class Airplane {
  constructor(
    private airplaneId: string,
    private _sqwak?: RF,
    private _target?: Target,
    private _runway: Runway | null = null,
    private _waypoint?: Waypoint
  ) {
    this.Socket.connect();
    this.Socket.on("disconnect", () => {
      this.Socket.connect();
    });
    this.Socket.emit("message", {
      to: "Tel Aviv",
      from: airplaneId,
      content: "radio check",
    });
    this.Socket.emit("meta", { name: airplaneId });
    PrismaInstanse.airplane
      .findUnique({ where: { id: this.airplaneId } })
      .then((data) => {
        if (data) {
          this._target = data.Target;
        }
      });
    this.alertLocation();
    this.handleReset();
    this.handleSqwkForwarding();
  }
  async handleReset() {
    this.Socket.on("message", ({ content }: Message) => {
      if (content.toLowerCase().includes("reset")) {
        this.removeSelf();
      }
    });
  }

  Socket = io(`${process.env.COM_URL}`);
  async removeSelf() {
    try {
      this.alertRemoval();
      await prismaService.airplane.delete({ where: { id: this.airplaneId } });
      this.Socket.disconnect();
      delete AirplanePool[this.airplaneId];
    } catch (error) {}
  }
  async inRunway() {
    // if ((await this._target) === "Arrive") {
    //   this.moveToLocation("Z");
    // }
  }
  async enterToRunway(AirportName = "Ben Gurion", Diraction = 30) {
    try {
      const newAirplane = await PrismaInstanse.airplane.update({
        where: { id: this.airplaneId },
        data: {
          Runway: {
            connect: {
              Diraction_AirportName: {
                AirportName: AirportName,
                Diraction: Diraction,
              },
            },
          },
          waypointName: { set: null },
        },
      });
      const runway = await prismaService.runway.findUnique({
        where: {
          Diraction_AirportName: {
            AirportName: AirportName,
            Diraction: Diraction,
          },
        },
      });

      this.airplaneId === runway?.airplaneId && (this._runway = runway);
      this.alertLocation();
    } catch (error) {}
  }
  async moveToLocation(toWaypointName: string) {
    try {
      assert(toWaypointName);
      await sleep(1000);
      const newAirplane = await PrismaInstanse.airplane.update({
        data: { Waypoint: { connect: { name: toWaypointName } } },
        where: { id: this.airplaneId },
      });
      await this.alertLocation();
    } catch (error) {}
  }
  async getLocaiton() {
    //@ts-ignore
    const way = (this._waypoint = await PrismaInstanse.airplane
      .findUnique({ where: { id: this.airplaneId } })
      .Waypoint());
    if (way) {
      this._waypoint = way;
      //@ts-ignore
      this._runway = null;
    } else {
      //@ts-ignore
      this._runway = await prismaService.airplane
        .findUnique({ where: { id: this.airplaneId } })
        .Runway();
      //@ts-ignore
      this._waypoint = null;
    }
  }
  async handleSqwkForwarding() {
    this.Socket.on("message", ({ content }: Message) => {});
  }
  async alertLocation() {
    try {
      await this.getLocaiton();
      console.log(this._waypoint, this._runway);

      let locationName = this._waypoint
        ? await this._waypoint!.name
        : `Runway ${this._runway!.Diraction}`;
      this.Socket.emit("message", {
        from: this.airplaneId,
        to: "Tel Aviv",
        content: `In ${locationName} ${
          this._target ? `for ${this._target}` : ""
        }`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async alertRemoval() {
    this.Socket.emit("message", {
      from: this.airplaneId,
      to: "Tel Aviv",
      content: "Disconnecting, good day",
    });
  }
}
