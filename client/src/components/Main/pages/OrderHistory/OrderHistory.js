import React from "react";
import {OrdersTable} from "./OrdersTable";
export const OrderHistory = (props) => {
    const {business} = props
    return (
        <React.Fragment>
            <div>Order history page</div>;
            {/*<Table business={business}></Table>*/}
            <OrdersTable business={business}/>
        </React.Fragment>
    )
};