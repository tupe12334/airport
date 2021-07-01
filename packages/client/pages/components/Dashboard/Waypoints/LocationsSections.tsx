import { Paper, Typography } from "@material-ui/core";
import { Runway, Waypoint } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationAccordion from "./LocationAccordion";
const LocationsSections = (props: {
  name: string;
  type: "waypoint" | "runway";
  airportName?: string;
}) => {
  const [stations, setStations] = useState<Waypoint[] | Runway[] | any[]>([]);
  const { name, type, airportName } = props;
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/${type}/${
      type === "waypoint" ? `procedure/${name}` : `airport/${airportName}`
    }`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((data: Waypoint[] | Runway[]) => {
        setStations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name, type, airportName]);

  return (
    <Paper style={{ padding: 10 }}>
      <Typography variant="h4">{props.name}</Typography>
      {stations.map((station) => (
        <LocationAccordion
          locationName={
            props.type === "waypoint"
              ? station.name
              : `Runway ${station.Diraction}`
          }
          type={props.type}
          key={station.name}
        />
      ))}
    </Paper>
  );
};

export default LocationsSections;
