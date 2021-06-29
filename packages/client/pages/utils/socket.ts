import assert from "assert";
import { io } from "socket.io-client";
class ClientCommunication {
  constructor() {
    assert(process.env.NEXT_PUBLIC_COM_URL);
    this.Socket.connect();
    this.Socket.emit("ping", { from: "Client", content: "radio check" });
  }
  Socket = io(`${process.env.NEXT_PUBLIC_COM_URL}`);
}

export default new ClientCommunication();
