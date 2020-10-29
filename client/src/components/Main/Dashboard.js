import React from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Box,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./Dashboard.styles";
import { EditBusiness } from "./EditBusiness/EditBusiness";

const TodaysOrders = (props) => {
  const style = styles();

  

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

      <Button variant="contained" color="primary" onClick={() => { alert('clicked') }}>
        Save Today's Orders
      </Button>
    </React.Fragment>
  );
};

const ChoosePage = (props) => {
  switch(props.page) {
    case 'edit-business':
      return (
        <EditBusiness />
      )
    case 'todays-orders':
      return (
        <TodaysOrders />
      )
    case 'order-history':
      return (
        "Order History"
      )
    default:
      return (
        <TodaysOrders />
      )
  }
}

export const Dashboard = (props) => {
  const style = styles();
  const page = 'edit-business'
  return (
    <React.Fragment>
      {/* <Container component="div" maxWidth="lg"> */}
      <ChoosePage page={page}/>
      {/* </Container> */}
    </React.Fragment>
  );
};
