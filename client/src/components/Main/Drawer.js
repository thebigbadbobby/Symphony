import React from 'react';
import {Drawer as MUIDrawer }from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import styles from "./Drawer.styles";

export const Drawer = (props) => {
    const {changePage, handleDrawerClose, open} = props
    const style = styles()
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
    return (<React.Fragment>
        <MUIDrawer
            className={style.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            style={{
                paper: style.drawerPaper,
            }}
        >
            <div className={style.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
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
    </React.Fragment>)
}