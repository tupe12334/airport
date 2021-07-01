import { Message } from "@prisma/client";
import { AirplanePool } from ".";
import { BaseProcedure } from "./BaseProcedure.class";
import { sleep } from "./utils/time";

class SID extends BaseProcedure {
  constructor() {
    super();
    this.initSocket();
  }
  initSocket() {
    this._socket.on(
      "message",
      async ({ content, from, to, sent_at }: Message) => {
        if (content.toLowerCase().includes("in rotem")) {
          await sleep(1000);
          try {
            await AirplanePool[from].removeSelf();
          } catch (error) {}
        }
      }
    );
  }
}
export default new SID();
