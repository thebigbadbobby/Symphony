import React, {useEffect, useState} from "react";
import styles from "./createProducts.styles";
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
  // returnedErrors.phoneNumber = !/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(
  //   formState.phoneNumber
  // );
  // check if any of them are empty, if they are, set to error state to true
  if (
    !formState.productName ||
    !formState.price 
    //|| !formState.phoneNumber
  ) {
    returnedErrors.productName = !formState.productName;
    returnedErrors.price = !formState.price;
  } else {
    returnedErrors.productName = formState.productName.length <= 0;
    returnedErrors.price = !formState.price;
  }

  return returnedErrors;
};

// Beginning of main function
export const CreateProducts = (props) => {
  const style = styles();
  const [formState, setFormState] = useState({
    productName: "",
    price: 0,
    // deliveryDays: "MWF",
  });
  const [formErrors, setFormErrors] = useState({
    productName: "",
    price: 0,
    // deliveryDays: false,
  });
  const onChange = (e) => {
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };
  const handleSubmit = (payload) => {
   // console.log(props);
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    // this simply checks if there are any errors that are true (in which case we don't want to submit)
    Object.keys(errorState).map(
      (key) => (hasErrors = hasErrors || errorState[key])
    );

    /* if there are no errors, post the newly created product onto the database */
    if (!hasErrors) {
      axiosWrap
        .post("/product/add-product", {
          businessID: props.business,
          itemName: formState.productName,
          itemDescription: formState.itemDescription,
          price: formState.price,
        })
        .then((res) => { /* server would respond with a 201 unless there is an error */
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
          hasErrors = true;
        });

        if(!hasErrors){
            /* alert user that the product has successfully been listed */
            window.alert("Product successfully listed!");
        }
    }
    // if there are errors, set them now.
    setFormErrors(errorState);
  };
  return(
    // -- return to create the input text fields
    <React.Fragment>
    <div className={style.pageTitle}>"Create Products"</div>
    <CardContent>
            <form
              id="sign-up-form"
              className={style.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormHelperText className={style.fieldHeader}>
              Product Name
              </FormHelperText>
              <Input
                className={style.field}
                id="productName"
                label="Product Name"
                placeholder="e.g. Spicy Chicken Wings"
                onChange={onChange}
                error={formErrors.productName}
              />
              <FormHelperText className={style.fieldHeader}>
              Price
              </FormHelperText>
              <Input
                className={style.field}
                id="price"
                label="Price"
                placeholder="e.g. 5.00"
                onChange={onChange}
                error={formErrors.price}
              />
              <FormHelperText className={style.hint}>
              Enter the exact price without the dollar sign.
              </FormHelperText>
            <Input
              className={style.field}
              id="itemDescription"
              label="Product Description"
              onChange={onChange}
              error={formErrors.itemDescription}
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
              <Button
              className={style.save}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Add Product
              </Button>
            </form>
          </CardContent>
    </React.Fragment>
  );
};
