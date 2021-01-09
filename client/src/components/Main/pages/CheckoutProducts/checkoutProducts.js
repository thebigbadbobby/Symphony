import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import styles from "./checkoutProducts.styles";

import { axiosWrap } from '../../../../axios-wrapper';


// Beginning of main function
export const CheckoutProducts = (props) => {
  const style = styles();
  return(
    <React.Fragment>
    <div className={style.pageTitle}>"Checkout Products"</div>
    <p>"This is the Checkout Products page."</p>
    </React.Fragment>
  );
};