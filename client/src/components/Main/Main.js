import React from "react";
import { Container } from "@material-ui/core";
import styles from "./Main.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { LogIn } from "../LogIn/LogIn";
import { Dashboard } from "./Dashboard.js";

export const Main = (props) => {
  const style = styles();

  return (
    <React.Fragment>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={style.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={style.title}>
            Kahzum Same Day
          </Typography>
          <LogIn
            className={style.signOutButton}
            isSignedIn={props.isSignedIn}
            handleSignOut={props.signOut}
          />
        </Toolbar>
      </AppBar>
      {/* <Container
        component="div"
        maxWidth="lg"
        className={style.signInContainer}
      >
        Main Works!
        
      </Container> */}
    <Dashboard />  
    </React.Fragment>
    
  );
};
