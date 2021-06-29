import { io } from "socket.io-client";
class ControlTowerCommunication {
  constructor() {
    this.Socket.connect();
    this.Socket.emit("ping", "Tel Aviv radio check");
  }
  Socket = io(`${process.env.COM_URL}`);
}

export default new ControlTowerCommunication();
