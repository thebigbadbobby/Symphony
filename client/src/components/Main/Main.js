import React, { useState } from "react";
import styles from "./Main.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { LogIn } from "../LogIn/LogIn";
import { Drawer } from "./Drawer";
import { TodaysOrders } from "./pages/TodaysOrders"
import { OrderHistory } from "./pages/OrderHistory"
import { StoreSettings } from "./pages/StoreSettings"

export const Main = (props) => {
  const style = styles();

  let [sidebarState, setSidebarState] = useState(false);
  let [pageState, setPageState] = useState('today\'s-orders');

  const changePage = (page) => {
    setPageState(page)
  }

  const renderSwitch = () => {
    switch (pageState) {
      case 'order-history':
        return <OrderHistory />
      case 'store-settings':
        return <StoreSettings/>
      case 'today\'s-orders':
        return <TodaysOrders/>
      default:
        return <OrderHistory />
    }
  }
  return (
    <React.Fragment>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={style.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={ () => setSidebarState(!sidebarState) }
          >
            {sidebarState
                ?       <Drawer changePage = {changePage}/>
                : null
            }
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
      {renderSwitch()}
    </React.Fragment>
    
  );
};
