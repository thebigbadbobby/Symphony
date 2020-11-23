import {
  Typography,
  Button,
  Input,
  FormHelperText,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect} from "react";
import styles from "./EditBusiness.styles";
import { axiosWrap } from '../../../../axios-wrapper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Part of alert button
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Beginning of main function
export const EditBusiness = (props) => {
  const style = styles();

  // Initialize string variables for pulling
  var businessName = "";
  var businessAddress = "";
  var businessPhone = "";

  // Calls the pullInfo function on page loading

  useEffect(() => {
    axiosWrap.get('/business/business-info',
        { params: { business: props.business } }
    )
        // On success, we auto-fill the page.
        .then(function (response) {
          businessName = response.data.businessName;
          businessAddress = response.data.pickupAddress;
          businessPhone = response.data.businessPhone;
          updateFillins();
        })
        // It should never fail since they should have a business already.
  }, []);

  // Updates the fill-in values if the user already has a business.
  function updateFillins(){
    document.getElementById("companyName").value = businessName;
    document.getElementById("address").value = businessAddress;
    document.getElementById("phone").value = businessPhone;
  }

  // Initialize alert varaiables
  const [success, setOpenSuccess] = React.useState(false);
  const [fail, setOpenFail] = React.useState(false);
  
  // Handles closing of the success alert
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  // Handles closing of the failure alert
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  // Save function, sends information to the backend and gives the user a reply.
  function saved(){
    // If any of the fill-ins are blank then fail.
    if(document.getElementById("companyName").value === ""){
      setOpenFail(true);
    } else if(document.getElementById("phone").value === ""){
      setOpenFail(true);
    } else if(document.getElementById("address").value ===  ""){
      setOpenFail(true);
    } else {
      // If all fill-ins have values, then patch!
      axiosWrap.patch('/business/update-business', {
        business: props.business,
        businessName: document.getElementById("companyName").value,
        businessPhone: document.getElementById("phone").value,
        pickupAddress: document.getElementById("address").value,
      })
      // Opens success pop-up.
      .then(function (response) {
        setOpenSuccess(true);
      })
      // Opens failure pop-up.
      .catch(function (error) {
        setOpenFail(true);
      });
    }
  }

  return (
    <React.Fragment>
      <Typography className={style.pageTitle} variant="h4">
        Store Settings
      </Typography>
      <div className={style.storeName}>
        Please enter your store's information:
      </div>
      <div className={style.container}>
        <Card className={style.root}>
          <CardContent>
            <FormHelperText className={style.inputSpacing}>
              Company Name
            </FormHelperText> 
            <Input
              id="companyName"
              label="Company Name"
              placeholder="e.g. Kahzum"
              multiline
              fullWidth
              variant="filled"
            />
            <FormHelperText className={style.inputSpacing}>
              Company Address
            </FormHelperText> 
            <Input
              id="address"
              label="Company Address"
              placeholder="e.g. 1156 High St, Santa Cruz, CA 95064"
              multiline
              fullWidth
              variant="filled"
            />
            <FormHelperText className={style.inputSpacing}>
              Company Phone
            </FormHelperText> 
            <Input
              id="phone"
              label="Company Phone"
              placeholder="e.g. 012-345-6789"
              multiline
              fullWidth
              variant="filled"
            />
          </CardContent>
        </Card>
        <div>
          <Button onClick={saved} className={style.saveButton} variant="contained">Save</Button>
        </div>
      </div>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          Saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={fail} autoHideDuration={6000} onClose={handleCloseFail}>
        <Alert onClose={handleCloseFail} severity="error">
          Fill-in left blank or incorrect format for phone number!
          Please use the format ###-###-#### for the phone number.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
