import React, { useState } from 'react';
import clsx from 'clsx';
import {Drawer} from './Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LogIn } from "../LogIn/LogIn";
import styles from "./Main.styles";
import { EditAccount } from "./pages/EditAccount/editAccount"
import { CreateProducts } from "./pages/CreateProducts/createProducts"
import { MyProducts } from "./pages/MyProducts/myProducts"
import { AllProducts } from "./pages/AllProducts/allProducts"
import {withStyles} from "@material-ui/core";

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
      case '2':
        return <AllProducts business={business}/>
      case '3':
        return <EditAccount business={business}/>
      case '4':
        return <CreateProducts business={business}/>
      case '5':
        return <MyProducts business={business}/>
      default:
        return <MyProducts business={business}/>
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const StyledAppBar = withStyles({
    root: {
        background: 'linear-gradient(to left, white , #add8e6)',
      "&.Mui-selected": {
        backgroundColor: "red"
      }
    },
  })(AppBar);


  return (
      <React.Fragment>
        <StyledAppBar
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
              Kahzum Shoplink
            </Typography>
            <div className={style.signOutButton}>
              <LogIn
                  isSignedIn={props.isSignedIn}
                  handleSignOut={props.signOut}
              />
            </div>
 
          </Toolbar>
        </StyledAppBar>
        <Drawer handleDrawerClose={handleDrawerClose} changePage={changePage} open={open}/>
        <div className={style.mainContainer}>
        {renderSwitch()}
        </div>
      </React.Fragment>
  );
}


