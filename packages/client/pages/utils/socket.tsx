import assert from "assert";
import { io } from "socket.io-client";
class ClientCommunication {
  constructor() {
    assert(process.env.NEXT_PUBLIC_COM_URL);
    this.Socket.connect();
    this.Socket.emit("message", { from: "Client", content: "radio check" });
  }
  // runWhenGetMessage(cb: (data) => any) {
  //   this.Socket.on("message", (data) => {
  //     cb(data);
  //   });
  // }
  // removeMessageListener() {
  //   this.Socket.off("message");
  // }
  Socket = io(`${process.env.NEXT_PUBLIC_COM_URL}`);
}
const getSocket = () => {
  const Socket = io(`${process.env.NEXT_PUBLIC_COM_URL}`);
  return Socket;
};
// export default new ClientCommunication();
