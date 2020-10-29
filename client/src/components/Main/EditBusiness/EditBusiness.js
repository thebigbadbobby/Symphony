import { Button } from "@material-ui/core";
import React from "react";
import styles from "./EditBusiness.styles";

export const EditBusiness = (props) => {
  const style = styles();

  function temp() {
    console.log("called temp")
  }
  temp();

  return (
    <React.Fragment>
      <div className={style.container}>
        <div className={style.storeName}>
          Your store name
        </div>
        <div className={style.buttonContainer}>
          <Button className={style.firstButton} variant="contained">Schedule Delivery</Button>
          <Button className={style.firstButton} variant="contained">Order History</Button>
          <Button variant="contained">My store</Button>
        </div>
      </div>
    </React.Fragment>
  );
};
