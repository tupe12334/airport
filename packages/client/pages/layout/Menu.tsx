import React from "react";
import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { SyncProblem, Loop } from "@material-ui/icons";
import axios from "axios";

const Menu = (props: { open: boolean; setOpen }) => {
  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      onClick={() => {
        props.setOpen(false);
      }}
    >
      <List>
        <div
          onClick={() => {
            axios.post(`${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/reset`);
          }}
        >
          <ListItem button>
            <ListItemIcon>
              <Loop />
            </ListItemIcon>
            <ListItemText primary="Reset airplanes" />
          </ListItem>
        </div>
        <div
          onClick={() => {
            axios.post(
              `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/hardreset`
            );
          }}
        >
          <ListItem button>
            <ListItemIcon>
              <SyncProblem />
            </ListItemIcon>
            <ListItemText primary="Hard Reset" />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
};

export default Menu;
