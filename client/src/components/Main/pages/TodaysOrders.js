import React, { useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  CssBaseline,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./TodaysOrders.styles";
const axios = require("axios").default;

export const TodaysOrders = (props) => {
  const style = styles();
  const business = React.useContext(globalStateContext);
  console.log('hi', business)
  let customer_name = useRef();
  let customer_address = useRef();
  let customer_phone = useRef();
  function SaveOrd() {
    let name =customer_name.current.value;
    let addr = customer_address.current.value;
    let phone = customer_phone.current.value;
    let order = {
      address: addr,
      customer_name:name,
      customer_phone:phone
    }
    axios
      .post(`http://localhost:5000/order/add-orders`, {
        business,
        orders: [
            order
        ],
      })
      .catch(function (error) {
        alert("error");
        alert(JSON.stringify(error));
      });
    // alert("Save Order!");
  }

  function CusInfo(props) {
    return (
      <React.Fragment>
        <Card className={style.root}>
          <CardContent>
            <TextField
              inputRef={customer_name}
              id="filled-textarea"
              label="Customer Name"
              // placeholder="Placeholder"
              multiline
              fullWidth
              variant="filled"
            />
            <TextField
              inputRef={customer_address}
              id="filled-textarea"
              label="Address"
              // placeholder="Placeholder"
              multiline
              fullWidth
              variant="filled"
            />
            <TextField
              inputRef={customer_phone}
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
      <businessIDContext.Consumer>
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
        </Container>

        <Button variant="contained" color="primary" onClick={SaveOrd}>
          Save Today's Orders
        </Button>
      </businessIDContext.Consumer>
    </React.Fragment>
  );
};
