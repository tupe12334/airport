import { useSocket } from "use-socketio";

const useSocketMeta = () => {
  const { socket, subscribe, unsubscribe } = useSocket("connect", () => {
    socket.emit("message", {
      to: "Communication",
      from: "Client",
      content: "radio check",
    });
    socket.emit("meta", { name: "Client" });
  });
  {
    const { socket } = useSocket("disconnect", () => {
      console.log("try agin");

      socket.io.reconnect();
    });
  }

  return null;
};

export default useSocketMeta;
