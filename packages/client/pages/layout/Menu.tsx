import React from "react";
import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { SyncProblem, Loop, Home, List as ListIcon } from "@material-ui/icons";
import axios from "axios";
import Link from "next/link";

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
        <Link href="/" passHref>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/log" passHref>
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
        </Link>
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
