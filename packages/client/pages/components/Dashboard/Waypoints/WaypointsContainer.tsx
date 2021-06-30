import React from "react";
import ProcedureList from "./ProcedureList";

const WaypointsContainer = () => {
  return (
    <div>
      <ProcedureList name="ILS" />
      <ProcedureList name="SID" />
      <ProcedureList name="Ground" />
    </div>
  );
};

export default WaypointsContainer;
