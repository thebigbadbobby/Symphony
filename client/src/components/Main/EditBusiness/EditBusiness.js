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
          Enter your store's information:
        </div>
        <div className={style.buttonContainer}>
          <Button className={style.firstButton} variant="contained">Address</Button>
          <Button className={style.firstButton} variant="contained">Phone</Button>
        </div>
        <div>
          <Button className={style.saveButton} variant="contained">Save</Button>
          
        </div>
      </div>
    </React.Fragment>
  );
};
