import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import Menu from "./Menu";

const Header = () => {
  const [value, setValue] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <AppBar position="static">
        <div style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Toolbar
          // style={{ justifyContent: "space-between" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              // style={{ flex: 1 }}
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{ flexGrow: 2, flexShrink: 2, textAlign: "start" }}
            >
              Airport control system
            </Typography>
            <Clock />
          </Toolbar>
        </div>
      </AppBar>
      <Menu open={menuOpen} setOpen={setMenuOpen} />
    </>
  );
};

export default Header;
