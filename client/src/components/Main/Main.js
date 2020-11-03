import React, {useState} from 'react';
import clsx from 'clsx';
import {Drawer} from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TodaysOrders } from "./pages/TodaysOrders"
import { OrderHistory } from "./pages/OrderHistory"
import { StoreSettings } from "./pages/StoreSettings"
import { LogIn } from "../LogIn/LogIn";
import styles from "./Main.styles";

export const Main = (props) => {
  const style = styles();
  const [open, setOpen] = React.useState(false);

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
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <React.Fragment>
        <AppBar
            position="fixed"
            className={clsx(style.appBar, {
              [style.appBarShift]: open,
            })}
        >
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(style.menuButton, open && style.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Kahzum Same Day
            </Typography>
            <LogIn
                className={style.signOutButton}
                isSignedIn={props.isSignedIn}
                handleSignOut={props.signOut}
            />
          </Toolbar>
        </AppBar>
        <Drawer handleDrawerClose={handleDrawerClose} changePage = {changePage} open={open}/>
        <main
            className={clsx(style.content, {
              [style.contentShift]: open,
            })}
        >
          <div className={style.drawerHeader} />
          {renderSwitch()}
        </main>
      </React.Fragment>
  );
}


