import { Messege } from "@prisma/client";
import { BaseProcedure } from "./BaseProcedure.class";

class SID extends BaseProcedure {
  constructor() {
    super();
    this.initSocket();
  }
  initSocket() {
    this._socket.on(
      "message",
      async ({ content, from, id, to, sent_at }: Messege) => {
        // if (content.toLowerCase().in) {
        // }
      }
    );
  }
}
