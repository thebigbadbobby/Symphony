import React, {useEffect, useState} from "react";

import styles from "./requestProducts2.styles";
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
import { RequestProducts } from "../../pages/RequestProducts/requestProducts"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
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
export const RequestProducts2 = (props) => {
  console.log(props.customer)
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
  const [customer, setCustomer] = useState(undefined);
  const [logos, setLogos] = useState(undefined);
  const [rules, setRules] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [id, setID] = useState(undefined)
  const [isPaid, setIsPaid] = useState(undefined)
  const onChange = (e) => {
    console.log(props.customer)
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };
  useEffect( () => {
  console.log(props.customer)
  setID(props.customer)
  const products= axiosWrap
  .get("/product/all-products", {
  }).then((result) => {console.log(result)
  setProducts(result.data)})
  const customer= axiosWrap
  .get("/invoice/"+props.invoiceID, {
  }).then((result) => {console.log(result)
  setCustomer(result.data)}).catch((error)=> {setCustomer(error)})
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
  // const send = () => {
  //   var temp=customer
    
  //   for (var assetnum = 0; assetnum < customer.bread.length; assetnum++) {
  //     if (formState["Amount"+assetnum]){
  //       console.log("called"+ formState["Amount"+assetnum])
  //       axiosWrap
  //       .patch("/customer/send", {
  //         customer: props.customer,
  //         recipient: formState.email,
  //         amount: formState["Amount"+assetnum],
  //         assetnum: assetnum
  //       })
  //       .then((result)=> {
  //         console.log("ekans", result)
  //         setCustomer(result.data)
  //       })
  //       .catch((err) => {
  //         console.log("Couldn't reach server!", err);
  //       });
  //     }
      
  //   }
    
  // }; 
  const stripeSend = (id) => {
  axiosWrap
  .get("/customer/"+ id, {
  }).then((result) => {console.log(result)
  
    console.log("koffing", id, customer)
    axiosWrap
        .patch("/customer/payInvoice", {
          customer: result.data,
          invoice: customer,
        })
        .then((response)=> {
          console.log("ekans", response)
          axiosWrap
          .patch("/invoice/update-invoice", {
            invoice: customer,
            fulfilled: true,
          }
          )
          setIsPaid(true)
          console.log(isPaid)
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
        });
        console.log("done")
      })
  }
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
  console.log(isPaid)
  console.log(customer)
  if ((customer&&customer.fulfilled)|isPaid){
    return(
    <Router>
    <Switch>
      <Route path="/:id" component={Child} />
    </Switch>
    <h3>PAID: ${customer.total}</h3>
    <h3>ITEMS: </h3>
    {Object.entries(JSON.parse(customer.items))
      .map( ([key, value]) => {
                console.log(customer.items)
              return (
                <h3>{key}: ${value[0]} x{value[1]} = {value[0]*value[1]}</h3>
              )
      })}
  </Router>)
  }
  else{
  return(
    
    // -- initial return to create the page for request products
    //      the top search bar UI
    <React.Fragment>
      <Router>
      <script src="./js/bolt11.min.js"></script>
      <div className={style.pageTitle}>"Checkout"</div>
      {isPaid? "":" "}
    {/* To get it to reload when isPaid changes */}
      {products&&customer&&customer.items ?
        
        <div className={style.block}>
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
          <h3>{customer.email}</h3>
          </FormHelperText>
          

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
            {Object.entries(JSON.parse(customer.items))
  .map( ([key, value]) => {
                console.log(customer.items)
              return (
                <div className={style.rectangle9}>
                  <img className={style.image} src={logo } alt="kahzum-logo"> 
                  </img>
                  <div>

                  </div>
                  <div className={style.deliveryInfo}>{key}</div>
                  <div className={style.deliveryInfo}>${value[0]}</div>
                  <div className={style.deliveryInfo}>Qty:{value[1]}</div>
                  {/* <div className={style.itemDesc}>{product.itemDescription}</div>           */}
                </div>
              );
            })}
          </CardContent>
          <h3>Total: ${customer.total}</h3>
        </div>
      : 
        "Invalid Invoice"
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
      {products&&customer&&customer.items ?
      
      <Button
        className={style.save}
        variant="contained"
        color="primary"
        type="submit"
        startIcon={<SendIcon />}
        onClick={() => {stripeSend(id)}}
      >
        Send Credits
      </Button>
      :""}
      {/* <p></p> */}
      <Switch>
          <Route path="/:id" component={Child} />
        </Switch>
      </Router>
    </React.Fragment>
  )};
  function Child(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  console.log("garbonzobeans")

  return (
    <div>
      <h3>ID: {props.match.params.id}</h3>
      
    </div>
  );
}
};

