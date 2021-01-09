import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import styles from "./editAccount.styles";
import { axiosWrap } from '../../../../axios-wrapper';


// Beginning of main function
export const EditAccount = (props) => {
  const style = styles();
  return(
    <React.Fragment>
    <div className={style.pageTitle}>"Edit Account"</div>
    <p>"This is the page for the user to edit their account and add payment."</p>
    </React.Fragment>
  );
};