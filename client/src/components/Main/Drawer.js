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
            text: "Request Products",
            icon: <SettingsIcon />,
            onClick: () => changePage("4")
        },
        {
            text: "Checkout Products",
            icon: <StorefrontIcon />,
            onClick: () => changePage("1")
        },
        {
            text: "Purchase History",
            icon: <SettingsIcon />,
            onClick: () => changePage("2")
        },
        {
            text: "Edit Account",
            icon: <HistoryIcon />,
            onClick: () => changePage("3")
        },
    ];
    return (<React.Fragment>
        <MUIDrawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={props.handleDrawerClose}
        >
            <div className={style.drawer}>

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
            </div>

        </MUIDrawer>
    </React.Fragment>)
}