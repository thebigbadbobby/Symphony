import React from "react";
import {OrdersTable} from "./OrdersTable";
export const OrderHistory = (props) => {
    const {business} = props
    return (
        <React.Fragment>
            <OrdersTable business={business}/>
        </React.Fragment>
    )
};