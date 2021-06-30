import React from "react";
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
  return null;
};

export default useSocketMeta;
