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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// Part of alert button
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Part of alert button
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// Beginning of main function
export const EditBusiness = (props) => {
  const style = styles();
  
  // Initialize alert varaiables
  const classes = useStyles();
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
    console.log('saved');

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
      setOpenSuccess(true);
    })
    
    .catch(function (error) {
      console.log(error);
      setOpenFail(true);
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
          Incorrect format for phone number!
          Please use the format ###-###-####.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
