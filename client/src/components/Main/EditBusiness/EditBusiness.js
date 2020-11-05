import { Button } from "@material-ui/core";
import React from "react";
import styles from "./EditBusiness.styles";

export const EditBusiness = (props) => {
  const style = styles();

  function temp() {
    console.log("called temp")
  }
  temp();

  function saved(){
    console.log('saved');
    //window.location.reload();
    console.log("Address: " + document.getElementById("address").value);
    console.log("Phone: " + document.getElementById("phone").value);
    alert("Saved!");
  }

  return (
    <React.Fragment>
      <div className={style.container}>
        <div className={style.storeName}>
          Enter your store's information:
        </div>
        <div className={style.fillinContainer}>
          <label for="address" variant="contained">Company Address</label>
          <input type="text" id="address" name="add" placeholder="Your companies address..." className={style.entryFields}></input>

          <label for="phone"  variant="contained">Company Phone</label>
          <input type="text" id="phone" name="pho" placeholder="Your companies address..." className={style.entryFields}></input>
        </div>
        <div>
          <Button onClick={saved} className={style.saveButton} variant="contained">Save</Button>
          
        </div>
      </div>
    </React.Fragment>
  );
};
