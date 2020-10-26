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

export const Dashboard = (props) => {
  return (
    <React.Fragment>
      {/* <Container component="div" maxWidth="lg"> */}
      <TodaysOrders />

      {/* </Container> */}
    </React.Fragment>
  );
};
