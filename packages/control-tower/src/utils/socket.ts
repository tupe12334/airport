import { io } from "socket.io-client";
class ControlTowerCommunication {
  constructor() {
    this.Socket.connect();
    this.Socket.emit("message", {
      to: "Communication",
      from: "Tel Aviv",
      content: "radio check",
    });
    this.Socket.emit("meta", { name: "Tel Aviv" });
  }
  Socket = io(`${process.env.COM_URL}`);
}

export default new ControlTowerCommunication();
