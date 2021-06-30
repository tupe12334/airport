import { Divider, List, ListItem, Paper } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useSocket } from "use-socketio";
const RadioLog = () => {
  const [log, setLog] = useState([]);
  // messageHistory.current = useMemo(() => {
  //   console.log(lastMessage);
  //   return messageHistory.current.concat(lastMessage.payload);
  // }, [lastMessage]);
  const { socket, subscribe, unsubscribe } = useSocket("message", (newLog) =>
    setLog([newLog, ...log])
  );

  return (
    <Paper style={{ padding: 10 }}>
      <Typography variant="h4" gutterBottom>
        Radio Log
      </Typography>
      <List>
        {log.map((message, i) => (
          <>
            <ListItem key={i}>{`${message.to ? message.to : ""} ${
              message.from ? "From " + message.from : ""
            } ${message.content ? message.content : ""}`}</ListItem>{" "}
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default RadioLog;
