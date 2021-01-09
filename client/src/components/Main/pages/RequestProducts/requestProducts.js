import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import styles from "./requestProducts.styles";
import { axiosWrap } from '../../../../axios-wrapper';


// Beginning of main function
export const RequestProducts = (props) => {
  const style = styles();
  return(
    <React.Fragment>
    <div className={style.pageTitle}>"Request Products"</div>
    <p>"This is the Request Products page."</p>
    </React.Fragment>
  );
};
