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
        if (content.toLowerCase().includes("in departure")) {
          await sleep(1000);
          await AirplanePool[from].removeSelf();
        }
      }
    );
  }
}
export default new SID();
