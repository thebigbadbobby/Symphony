import React, {useEffect, useState} from "react";

import styles from "./requestProducts.styles";
import {
  Container,
  Typography,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import Bitcoin from "../../../../assets/Bitcoin-Logo.png";
import Litecoin from "../../../../assets/Litecoin-Logo.png";
import Kahzum from "../../../../assets/Checkout Coin.png"
import { axiosWrap } from "../../../../axios-wrapper";
import logo from "../../../../assets/Checkout Coin.png";
import Snackbar from '@material-ui/core/Snackbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

// Part of alert button
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const validateInput = (formState, errors) => {
  const returnedErrors = { ...errors };
  returnedErrors.phoneNumber = !/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(
    formState.phoneNumber
  );
  // check if any of them are empty, if they are, set to error state to true
  if (
    !formState.productName ||
    !formState.description ||
    !formState.phoneNumber
  ) {
    returnedErrors.productName = !formState.productName;
    returnedErrors.description = !formState.description;
  } else {
    returnedErrors.productName = formState.productName.length <= 0;
    returnedErrors.description = !formState.description;
  }

  return returnedErrors;
};

//allows us to calculate last return date
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
// Beginning of main function
export const RequestProducts = (props) => {
  const [formState, setFormState] = useState({
    productName: "",
    coin: "Bitcoin"
    // deliveryDays: "MWF",
  });
  const [formErrors, setFormErrors] = useState({
    productName: ""
    // deliveryDays: false,
  });
  const [products, setProducts] = useState(undefined);
  const [report, setReport] = useState("Ekans");
  const [error, setError] = useState("Arbok");
  const [customer, setCustomer] = useState(undefined);
  const [logos, setLogos] = useState(undefined);
  const [rules, setRules] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
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
  const onChange = (e) => {
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };
  useEffect( () => {
  const products= axiosWrap
  .get("/product/all-products", {
  }).then((result) => {console.log(result)
  setProducts(result.data)})
  const customer= axiosWrap
  .get("/customer/"+props.customer, {
  }).then((result) => {console.log(result)
  setCustomer(result.data)})
  setLogos({"Bitcoin": Bitcoin, "Litecoin": Litecoin,"Kahzum Rewards": Kahzum})
  setRules({"Bitcoin":"bitcoin:¡?amount=™","Litecoin":"litecoin:¡?amount=™"})
  },[])
  const handleSubmit = (payload) => {
    console.log(props)
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    // this simply checks if there are any errors that are true (in which case we don't want to submit)
    Object.keys(errorState).map(
      (key) => (hasErrors = hasErrors || errorState[key])
    );

    if (!hasErrors) {
      axiosWrap
        .post("/products/get-product", {
          name: formState.productName
        })
        .then((res) => {
          props.businessCreated(res.data._id);
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
        });
    }
    // if there are errors, set them now.
    setFormErrors(errorState);
  };
  const onclickRequest = (product) => {
    window.alert("You have added a product to your cart");
    //change return days according to each product return window
    const returnDays = 7;
    const event = new Date();
    const placeholder = "Delivered in 3-5 business days.";
    console.log(event.toUTCString());
    axiosWrap
        .post("/request/add-request", {
          //insert businessID and productID based on the product listing
          
          customerID: props.customer,
          businessID: product.businessID,
          productID: product._id,
          itemName: product.itemName,
          price: product.price,
          date: event.toUTCString(),
          deliveryInfo: placeholder,
         // returnOpt format: ["01/2/20", "2/3/1"],
          returnOpt: [event, addDays(event, returnDays)],
        })
        .then((res) => {
          //props.requestCreated(res.data._id);
          console.log("Product has been requested!");
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const generateTransaction = () => {
    setTransaction(rules[formState.coin].replace('¡', "address").replace('™', formState.amount))
  };
  const send = () => {
    var temp=customer
          for (var assetnum = 0; assetnum < customer.bread.length; assetnum++) {
            if (formState["Amount"+assetnum]){
              let amountsent=formState["Amount"+assetnum]
              console.log("called"+ formState["Amount"+assetnum])
              axiosWrap
              .post("/customer/send", {
                customer: props.customer,
                recipient: formState.email,
                amount: formState["Amount"+assetnum],
                assetnum: assetnum
              })
              .then((result)=> {
                console.log("ekans", result)
                setCustomer(result.data)
                setReport("Sent "+ amountsent +" to " + formState.email + ".")
                setOpenSuccess(true);
              })
              .catch((err) => {
                console.log("Couldn't reach server!", err);
                console.log("arbok")
                console.log()
                if(err.toString().includes("404")){
                  setError("Incorrect Address")
                }
                if(err.toString().includes("401")){
                  setError("Amount must be positive!")
                }
                if(err.toString().includes("402")){
                  setError("Insufficient Funds!")
                }
                setOpenFail(true);
              });
            }
            
          }
    
    
  }; 
  const handleDropdownChange = (e, id) => {
    e.preventDefault();
    const newState = formState;
    newState[id] = e.target.value;
    setFormState(newState);
  };

  // -- code block to add new button for ?
  //    might be re-used later.
  /* const onclickButton = (e) => {
     console.log("hello world");
     console.log(props);
     axiosWrap
         .post("/request/add-request", {
           //insert businessID and productID based on the product listing
           customerID: props.customer,
           businessID: "90",
           productID: "20"
         })
         .then((res) => {
           //props.requestCreated(res.data._id);
          console.log("Product has been requested!");
         })
         .catch((err) => {
           console.log("Couldn't reach server!", err);
         });
   };*/
  const style = styles();
  var counter=-1
  console.log(customer)
  return(
    
    // -- initial return to create the page for request products
    //      the top search bar UI
    <React.Fragment>
      <Router>
      <script src="./js/bolt11.min.js"></script>
      <h1 className={style.pageTitle}>KahZap Rewards</h1>
      <CardContent>
        <form
          id="sign-up-form"
          className={style.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* <Button
            className={style.save}
            variant="contained"
            color="primary"
            onClick={() => {}}
            startIcon={<SaveIcon />}
          >
            Cash Out
          </Button> */}
          <FormHelperText className={style.fieldHeader}>
          Email Address
          </FormHelperText>
          <Input
            className={style.field}
            id="email"
            label="Email"
            placeholder="email@example.com"
            onChange={onChange}
            error={formErrors.productName}
          />

          <p></p>
              {/* We can add this in if we ever decide to do two day */}
              {/* <Select
                labelId="demo-simple-select-label"
                id="deliveryDays"
                label="Delivery Days"
                defaultValue={formState.deliveryDays}
                onChange={(e) => handleDropdownChange(e, "deliveryDays")}
              >
                <MenuItem value="MWF">Mon, Wed, Fri</MenuItem>
                <MenuItem value="TTS">Tues, Thurs, Sat</MenuItem>
              </Select>
              <FormHelperText className={style.field}>
                Which days would you prefer deliveries?
              </FormHelperText> */}
        </form>
      </CardContent>
    
      {products&&customer ?
        <div className={style.block}>
          <CardContent>
            {/* <div className={style.rectangle9}>
              <img className={style.logo} src={logo } alt="kahzum-logo"> 
              </img>
              <div className={style.itemName}></div>
              <div className={style.block}>
                <form
                  id="sign-up-form"
                  className={style.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                                        
                  <FormHelperText className={style.fieldHeader}>
                    Coin
                  </FormHelperText>
                  <Select
                    labelId="demo-simple-select-label"
                    id="coin"
                    label="Coin"
                    defaultValue={formState.coin}
                    onChange={(e) => handleDropdownChange(e, "coin")}
                  >
                    <MenuItem value="Bitcoin">Bitcoin</MenuItem>
                    <MenuItem value="Litecoin">Litecoin</MenuItem>
                  </Select>
                  <FormHelperText className={style.fieldHeader}>
                    Amount
                  </FormHelperText>
                  <Input
                    className={style.field}
                    id="amount"
                    label="Amount"
                    placeholder="4.2"
                    onChange={onChange}
                    error={formErrors.productName}
                  />
                  <p></p>
                  <Button
                    className={style.save}
                    variant="contained"
                    color="primary"
                    onClick={() => {generateTransaction()}}
                  >
                    Copy URL
                  </Button>
                </form>
                {transaction? transaction: ""}
              </div>
            </div> */}
                  {/* -- products content mapping to UI */}
            {products.map( (product) => {
                counter+=1
                var Amount="Amount" + counter
                console.log("ekans")
                console.log(customer)
              return (
                <div className={style.rectangle9}>
                  <img className={style.image} src={logos[product.itemDescription] } alt="kahzum-logo"> 
                  </img>
                  <div>
                    <div className={style.itemName}>{customer.bread[counter]} {product.itemName}</div>
                  </div>
                  <div className={style.price}></div>
                  <div className={style.block}>
                    <form
                      id="sign-up-form"
                      className={style.form}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <FormHelperText className={style.fieldHeader}>
                        Amount
                      </FormHelperText>
                      <Input
                        className={style.field}
                        id={Amount}
                        label="Amount"
                        placeholder="4.2"
                        onChange={onChange}
                        error={formErrors.productName}
                      />
                      <p></p>
                    </form>
                        {/* <div className={style.ellipse}>
                    <span className={style.rate}>4.6</span>
                    </div> */}
                  </div>
                  {/* <div className={style.deliveryInfo}>2.99 Delivery Fee*30-40 Min*$$</div> */}
                  {/* <div className={style.itemDesc}>{product.itemDescription}</div>           */}
                </div>
              );
            })}
          </CardContent>
        </div>
      : 
        ""
      }
      {/* <Button
        className={style.rectangleplus}
        variant="contained"
        color="primary"
        type="submit"
      >
      <img className={style.imageadd} src={add } alt="kahzum-logo"> 
                  </img>
      </Button> */}
      <Button
        style={{
          borderRadius: 35,
          backgroundColor: "#A958F4",
          padding: "18px 18px",
          fontSize: "18px"
      }}
        variant="contained"
        color="primary"
        type="submit"
        startIcon={<SendIcon />}
        onClick={() => {send()}}
      >
        Send Credits
      </Button>
      <p></p>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          {report}
        </Alert>
      </Snackbar>
      <Snackbar open={fail} autoHideDuration={6000} onClose={handleCloseFail}>
        <Alert onClose={handleCloseFail} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {/* <Switch>
          <Route path="/:id" component={Child} />
        </Switch> */}
      </Router>
    </React.Fragment>
  );
  function Child(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  

  return (
    <div>
      <h3>ID: {props.match.params.id}</h3>
    </div>
  );
}
};

