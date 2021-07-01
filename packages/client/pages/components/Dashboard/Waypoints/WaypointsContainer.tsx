import React from "react";
import LocationsSections from "./LocationsSections";

const WaypointsContainer = () => {
  return (
    <div>
      <LocationsSections name="ILS" type="waypoint" />
      <LocationsSections name="SID" type="waypoint" />
      <LocationsSections name="Ground" type="waypoint" />
      <LocationsSections name="Runway" type="runway" airportName="Ben Gurion" />
    </div>
  );
};

export default WaypointsContainer;
