import React from "react";
import {OrdersTable} from "./OrdersTable";
export const OrderHistory = (props) => {
    const {business} = props
    // const business = "5fa4a33634b8df278531dfd5"
    return (
        <React.Fragment>
            <OrdersTable business={business}/>
        </React.Fragment>
    )
};