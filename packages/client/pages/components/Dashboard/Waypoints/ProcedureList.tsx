import { Typography, Paper } from "@material-ui/core";
import { Waypoint } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import WaypointListItem from "./WaypointListItem";

const ProcedureList = (props: { name: string }) => {
  const [stations, setStations] = useState<Waypoint[]>([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/waypoint/procedure/${props.name}`
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data);

        setStations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Paper style={{ padding: 10 }}>
      <Typography variant="h4">{props.name}</Typography>
      {stations.map((station, i) => (
        <WaypointListItem waypoint={station} key={station.id} />
      ))}
    </Paper>
  );
};

export default ProcedureList;
