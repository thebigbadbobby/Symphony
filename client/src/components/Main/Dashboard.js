import React from "react";
import {
  Container,
  Typography,
  TextField,
  CssBaseline,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./Dashboard.styles";
const axios = require("axios").default;

const TodaysOrders = (props) => {
  const style = styles();

  function SaveOrd() {
    alert("Save Order!");
    axios
      .post(`http://localhost:5000/business/add-business`, { "businessName": "CodyCody", "businessPhone": "408-435-3532", "pickupAddress": "123 great lane", "ownerFullName": "Sam Smith", "ownerEmail": "smith2@gmail.com", "ownerPhone":"909-999-5890" })
      .catch(function (error) {
        alert("error");
        alert(JSON.stringify(error));
      });
    alert("Save Order!");
  }

  
  function CusInfo(props) {
    return (
      <React.Fragment>
        <Card className={style.root}>
          <CardContent>
            <TextField
              id="filled-textarea"
              label="Customer Name"
              // placeholder="Placeholder"
              multiline
              fullWidth
              variant="filled"
            />
            <TextField
              id="filled-textarea"
              label="Address"
              // placeholder="Placeholder"
              multiline
              fullWidth
              variant="filled"
            />
            <TextField
              id="filled-textarea"
              label="Phone"
              placeholder="(###)###-####"
              multiline
              fullWidth
              variant="filled"
            />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="div" maxWidth="lg">
        <Typography className={style.header} variant="h4">
          Today's Orders
        </Typography>
        <Typography className={style.header} variant="subtitle2">
          Your scheduled pickup time is 12am
          <br />
          Your customers can expect their order by 1am
          <br />
          Enter orders below before 11pm to ensure that we send a driver to pick
          it up.
        </Typography>
        <Typography className={style.header} variant="h6">
          Please enter your customer’s information:
        </Typography>
        <CusInfo />
        <CusInfo />
        <CusInfo />
      </Container>

      <Button variant="contained" color="primary" onClick={() => {SaveOrd}}>
        Save Today's Orders
      </Button>
    </React.Fragment>
  );
};

export const Dashboard = (props) => {
  return (
    <React.Fragment>
      {/* <Container component="div" maxWidth="lg"> */}
      <TodaysOrders />

      {/* </Container> */}
    </React.Fragment>
  );
};
