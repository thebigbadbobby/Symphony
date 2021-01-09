import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import styles from "./purchaseHistory.styles";
import { axiosWrap } from '../../../../axios-wrapper';


// Beginning of main function
export const PurchaseHistory = (props) => {
  const style = styles();
  return(
    <React.Fragment>
    <div className={style.pageTitle}>"Purchase History"</div>
    <p>"This is the Purchase History page."</p>
    </React.Fragment>
  );
};