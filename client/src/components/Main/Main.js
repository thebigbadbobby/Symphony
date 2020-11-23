import React, { useState } from 'react';
import clsx from 'clsx';
import {Drawer} from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { OrderHistory } from "./pages/OrderHistory/OrderHistory"
import { TodaysOrders } from "./pages/TodaysOrders/TodaysOrders"
import { LogIn } from "../LogIn/LogIn";
import styles from "./Main.styles";
import { EditBusiness } from './pages/EditBusiness/EditBusiness'

export const Main = (props) => {
  const style = styles();
  const { business } = props
  const [open, setOpen] = useState(false);

  let [pageState, setPageState] = useState('today\'s-orders');

  const changePage = (page) => {
    setPageState(page)
    setOpen(false)
  }

  const renderSwitch = () => {
    switch (pageState) {
      case 'order-history':
        return <OrderHistory business={business}/>
      case 'store-settings':
        return <EditBusiness user={props.user} />
      case 'today\'s-orders':
        return <TodaysOrders business={business}/>
      default:
        return <TodaysOrders business={business}/>
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
            position="static"
            className={style.appBar}
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
            <Typography variant="h6" className={style.appTitle}>
              Kahzum Same Day
            </Typography>
            <div className={style.signOutButton}>
              <LogIn
                  isSignedIn={props.isSignedIn}
                  handleSignOut={props.signOut}
              />
            </div>
 
          </Toolbar>
        </AppBar>
        <Drawer handleDrawerClose={handleDrawerClose} changePage={changePage} open={open}/>
        <div className={style.mainContainer}>
        {renderSwitch()}
        </div>
      </React.Fragment>
  );
}


