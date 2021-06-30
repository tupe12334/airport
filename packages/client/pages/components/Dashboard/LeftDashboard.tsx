import React from "react";
import WaypointsList from "../WaypointsList";
import RadioLog from "../RadioLog";
import WaypointsContainer from "./Waypoints/WaypointsContainer";

const LeftDashboard = (props: { waypoints }) => {
  return (
    <div style={{ flex: 1 }}>
      <WaypointsContainer />
      <RadioLog />
    </div>
  );
};

export default LeftDashboard;
