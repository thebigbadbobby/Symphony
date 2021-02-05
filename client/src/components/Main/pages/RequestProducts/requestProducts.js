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
import { axiosWrap } from "../../../../axios-wrapper";
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

// Beginning of main function
export const RequestProducts = (props) => {
  const [formState, setFormState] = useState({
    productName: ""
    // deliveryDays: "MWF",
  });
  const [formErrors, setFormErrors] = useState({
    productName: ""
    // deliveryDays: false,
  });
  const onChange = (e) => {
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };
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
  const onclick = (e) => {
    console.log("hello world");
    // adding a request..
    // Put 
    // add
    // request
    // here
    // specify customerID using props.customerID
  };
  const style = styles();
  return(
    <React.Fragment>
    <div className={style.pageTitle}>"Request Products"</div>
    <CardContent>
            <form
              id="sign-up-form"
              className={style.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormHelperText className={style.fieldHeader}>
              Product Search
              </FormHelperText>
              <Input
                className={style.field}
                id="productName"
                label="Product Name"
                placeholder="e.g. Bill's Burgers"
                onChange={onChange}
                error={formErrors.productName}
              />
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
              <Button
              className={style.save}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Search
              </Button>
              <div>
              <div className={style.rectangle9} onClick={onclick}>
                {/* <img src="" alt="" className={style.image}> 
                </img> */}
                <div className={style.itemName}>name</div>
                <div className={style.ellipse}>
                  <span className={style.rate}>4.6</span>
                </div>
                <div className={style.deliveryInfo}>2.99 Delivery Fee*30-40 Min*$$</div>            
              </div>
              <div className={style.rectangle9}></div>
              <div className={style.rectangle9}></div>
              <div className={style.rectangle9}></div>
              </div>
            </form>
          </CardContent>
    </React.Fragment>
  );
};
