import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Airplane, Message } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSocket } from "use-socketio";
import AirplaneApi from "../../../api/airplane";

const LocationAccordion = (props: {
  locationName: string;
  type: "waypoint" | "runway";
}) => {
  const [airplane, setAirplane] = useState<Airplane>(null);
  const { locationName, type } = props;
  useSocket("message", async (log: Message) => {
    const { content, from, to } = log;
    if (content.toLowerCase().includes(`in ${locationName.toLowerCase()}`)) {
      const data = await AirplaneApi.getAirplaneById(from);
      setAirplane(data);
    } else if (content.toLowerCase().includes("in") && from === airplane?.id) {
      setAirplane(null);
    } else if (
      content.toLowerCase().includes("disconnecting") &&
      from === airplane?.id
    ) {
      setAirplane(null);
    } else if (content.toLowerCase().includes("reset")) {
      setAirplane(null);
    }
  });
  useEffect(() => {
    try {
      if (type && locationName) {
        const url = `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/${type}/${
          type === "waypoint" ? locationName + "/" : ""
        }airplane`;
        // console.log(url);
        axios
          .get(url)
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
          });
      }
    } catch (error) {}
  }, [locationName, type]);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {props.locationName}
          {airplane
            ? ` ${airplane.Target === "Arrive" ? "🛬" : "🛫"} ${
                !airplane.Valid ? "🆘" : ""
              }`
            : null}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {airplane ? (
          <Typography>
            Flight {airplane.id} is {airplane.Target}
          </Typography>
        ) : (
          <Typography>No airplane in waypoint</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default LocationAccordion;
