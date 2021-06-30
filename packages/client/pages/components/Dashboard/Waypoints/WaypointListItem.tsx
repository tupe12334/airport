import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { useSocket } from "use-socketio";
import AirplaneApi from "../../../api/airplane";
import { Airplane, Messege, Waypoint } from "@prisma/client";

const WaypointListItem = (props: { waypoint: Waypoint }) => {
  const [airplane, setAirplane] = useState<Airplane>(null);
  useSocket("message", async (log: Messege) => {
    const { content, from, to } = log;
    if (
      content.includes(props.waypoint.name) &&
      content.toLowerCase().includes("in")
    ) {
      const data = await AirplaneApi.getAirplaneById(from);
      console.log(data);

      setAirplane(data);
    } else if (content.toLowerCase().includes("in") && from === airplane?.id) {
      setAirplane(null);
    } else if (content.toLowerCase().includes("disconnecting")) {
      setAirplane(null);
    } else if (content.toLowerCase().includes("reset")) {
      setAirplane(null);
    }
  });
  useEffect(() => {
    AirplaneApi.getAirplaneFromWaypoint(props.waypoint.name).then(setAirplane);
  }, []);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {props.waypoint.name} {airplane ? " ✈️" : null}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {airplane ? (
          <Typography>Flight {airplane.id} is in waypoint</Typography>
        ) : (
          <Typography>No airplane in waypoint</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default WaypointListItem;
