import { Accordion } from "@material-ui/core/";
import { Waypoint } from "@prisma/client";
import React from "react";
import WaypointListItem from "./Dashboard/Waypoints/WaypointListItem";

const WaypointsList = (props: { waypoints: Waypoint[] }) => {
  return (
    <>
      {props.waypoints.map((waypoint, i) => (
        <WaypointListItem key={waypoint.id} waypoint={waypoint} />
      ))}
    </>
  );
};

export default WaypointsList;
