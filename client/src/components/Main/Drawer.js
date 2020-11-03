import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StorefrontIcon from '@material-ui/icons/Storefront';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  drawer: {
    width: "210px",
  }
});



export const Drawer = (props) => {
  const { changePage } = props;
  const classes = useStyles();
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

  // const toggleDrawer = (open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //
  //   setDrawerOpen(open);
  // };

  return (
      <React.Fragment>
        <MUIDrawer variant="permanent" className={classes.drawer}>
          <List>
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
        </MUIDrawer>
      </React.Fragment>
  );
};
