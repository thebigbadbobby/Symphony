import {
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import styles from "./EditBusiness.styles";
import axios from 'axios';
//import {MDCSnackbar} from '@material/snackbar';
//const snackbar = new MDCSnackbar(document.querySelector('mdc-snackbar'));

export const EditBusiness = (props) => {
  const style = styles();

  function temp() {
    console.log("called temp")
  }
  temp();

  // val contextView = findViewById<View>(R.id.context_view);
  
  // Snackbar.make(contextView, R.string.text_label, Snackbar.LENGTH_SHORT)
  //   .show()

  function saved(){
    console.log('saved');
    //window.location.reload();
    console.log("Name: " + document.getElementById("companyName").value);
    console.log("Address: " + document.getElementById("address").value);
    console.log("Phone: " + document.getElementById("phone").value);
    console.log(props.user.getBasicProfile().$t); // email
    axios.post('http://localhost:5000/business/add-business', {
      businessName: document.getElementById("companyName").value,
      businessPhone: document.getElementById("phone").value,
      pickupAddress: document.getElementById("address").value,
      ownerFullName: props.user.getBasicProfile().Ad,
      ownerPhone: document.getElementById("phone").value,
      ownerEmail: props.user.getBasicProfile().$t,
    })
    .then(function (response) {
      console.log(response);
      alert("Saved!");
    })
    .catch(function (error) {
      console.log(error);
      alert("Incorrect format for phone number!\nPlease use the format ###-###-####.")
    });
  }

  return (
    <React.Fragment>
      <Typography className={style.storeName} variant="h4">
        Store Settings
      </Typography>
     <div className={style.container}>
        <div className={style.storeName}>
          Enter your store's information:
        </div>
      <Card className={style.root}>
        <CardContent>
          <TextField
            id="companyName"
            label="Company Name"
            // placeholder="Placeholder"
            multiline
            fullWidth
            variant="filled"
          />
          <TextField
            id="address"
            label="Company Address"
            // placeholder="Placeholder"
            multiline
            fullWidth
            variant="filled"
          />
          <TextField
            id="phone"
            label="Company Phone"
            placeholder="(###)###-####"
            multiline
            fullWidth
            variant="filled"
          />
        </CardContent>
      </Card>
        {/* <div className={style.fillinContainer}>
          <label for="companyName"  variant="contained">Company Name</label>
          <input type="text" id="companyName" placeholder="Your companies name..." className={style.entryFields}></input>

          <label for="address" variant="contained">Company Address</label>
          <input type="text" id="address" placeholder="Your companies address..." className={style.entryFields}></input>

          <label for="phone"  variant="contained">Company Phone</label>
          <input type="text" id="phone" placeholder="###-###-####" className={style.entryFields}></input>
        </div> */}
        <div>
          <Button onClick={saved} className={style.saveButton} variant="contained">Save</Button>
        </div>
        {/* <div class="mdc-snackbar">
          <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
            <div class="mdc-snackbar__label" aria-atomic="false">
              Can't send photo. Retry in 5 seconds.
            </div>
            <div class="mdc-snackbar__actions" aria-atomic="true">
              <button type="button" class="mdc-button mdc-snackbar__action">
                <div class="mdc-button__ripple"></div>
                <span class="mdc-button__label">Retry</span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};
