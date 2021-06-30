import { Accordion } from "@material-ui/core/";
import React from "react";
import WaypointListItem from "./WaypointListItem";

const WaypointsList = (props: {
  waypoints: [{ id: string; name: string }];
}) => {
  return (
    <>
      {props.waypoints.map((waypoint, i) => (
        <WaypointListItem key={waypoint.id} waypoint={waypoint} />
      ))}
    </>
  );
};

export default WaypointsList;
