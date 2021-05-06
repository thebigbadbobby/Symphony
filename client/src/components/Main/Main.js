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
import { PurchaseHistory } from './pages/PurchaseHistory/purchaseHistory'
import { CheckoutProducts } from "./pages/CheckoutProducts/checkoutProducts"
import { EditAccount } from "./pages/EditAccount/editAccount"
import { RequestProducts } from "./pages/RequestProducts/requestProducts"
import {withStyles} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { RequestProducts2 } from './pages/RequestProducts2/requestProducts2';
import { RequestProductsBack } from './pages/RequestProductsBack/requestProductsBack';
export const Main = (props) => {
  const style = styles();
  const { customer } = props
  const [open, setOpen] = useState(false);

  let [pageState, setPageState] = useState('today\'s-orders');

  const changePage = (page) => {
    setPageState(page)
    setOpen(false)
  }

  const renderSwitch = (props) => {
    console.log(props.match.params.id)
    if (props.match.params.id)
    {
      switch (pageState) 
      {
        case '1':
          return <CheckoutProducts customer={customer}/>
        case '2':
          return <PurchaseHistory user={props.user} customer={customer}/>
        case '3':
          return <EditAccount customer={customer}/>
        case '4':
          return <RequestProductsBack customer={customer}/>
        default:
          return <RequestProducts2 customer={customer} invoiceID={props.match.params.id}/>
      }
    }
    else
    {
      switch (pageState) 
      {
        case '1':
          return <CheckoutProducts customer={customer}/>
        case '2':
          return <PurchaseHistory user={props.user} customer={customer}/>
        case '3':
          return <EditAccount customer={customer}/>
        case '4':
          return <RequestProductsBack customer={customer}/>
        default:
          return <RequestProducts customer={customer}/>
      }
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
      <Router>
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
        <Switch>
          <Route path="/:id" component={renderSwitch} />
          <Route path="/" component={renderSwitch} />
        </Switch>
        </div>
        </Router>
      </React.Fragment>
  );
}


