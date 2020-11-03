import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import { TodaysOrders } from "./pages/TodaysOrders"
import { OrderHistory } from "./pages/OrderHistory"
import { StoreSettings } from "./pages/StoreSettings"
import styles from "./Main.styles";

export const Main = (props) => {
  const classes = styles();
  const theme = useTheme();
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

  const itemsList = [
    {
      text: "Today's Orders",
      icon: <StorefrontIcon />,
      onClick: () => changePage("today's-orders")
    },
    {
      text: "Order History",
      icon: <HistoryIcon />,
      onClick: () => changePage("order-history")
    },
    {
      text: "Store Settings",
      icon: <SettingsIcon />,
      onClick: () => changePage("store-settings")
    }
  ];

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
        >
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Kahzum Same Day
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem onClick = {()=> {alert('hi')}}button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
            {itemsList.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                  <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
              );
            })}
          </List>
          {/* <Divider /> */}
        </Drawer>
        <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
        >
          <div className={classes.drawerHeader} />
          {renderSwitch()}
        </main>
      </div>
  );
}


