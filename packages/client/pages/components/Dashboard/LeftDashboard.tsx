import React from "react";
import WaypointsList from "../WaypointsList";
import RadioLog from "../RadioLog";

const LeftDashboard = (props: { waypoints }) => {
  return (
    <div style={{ flex: 1 }}>
      <WaypointsList waypoints={props.waypoints} />
      <RadioLog />
    </div>
  );
};

export default LeftDashboard;
