import React, {useEffect, useState} from "react";
import styles from "./myProducts.styles";
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
import { axiosWrap } from "../../../../axios-wrapper";
import logo from "../../../../assets/mint-stacked.svg";
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
export const MyProducts = (props) => {
  const [formState, setFormState] = useState({
    productName: ""
    // deliveryDays: "MWF",
  });
  const [formErrors, setFormErrors] = useState({
    productName: ""
    // deliveryDays: false,
  });
  const [products, setProducts] = useState(undefined);
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
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
        });
    }
    // if there are errors, set them now.
    setFormErrors(errorState);
  };

  const style = styles();
  return(
    // -- initial return to create the search function
    // search function is currently not in use
    <React.Fragment>
    <div className={style.pageTitle}>"My Products"
    <CardContent>
            <form
              id="sign-up-form"
              className={style.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              {/* Unused product search function
              <FormHelperText className={style.fieldHeader}>
              Product Search
              </FormHelperText> */}
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
            </form>
    </CardContent>
    </div>
    {products ?
    <div className={style.block}>
              <CardContent>
                {/* return to map products to the UI */}
                {products.map( (product) => {
                    console.log(product.businessID);
                    // selects only the products that match up with the current user's ID
                    if (product.businessID == props.business)
                        return (
                          <div className={style.rectangle9}>
                            <div className={style.block}>
                                <div className={style.ellipse}>
                            <span className={style.rate}>4.6</span>
                            </div>
                          </div>
                          <img className={style.image} src={logo} alt="kahzum-logo">
                          </img>
                          <div>
                          <div className={style.itemName}>{product.itemName}</div>

                          </div>
                          <div className={style.price}>${product.price}</div>
                          <div className={style.deliveryInfo}>2.99 Delivery Fee*30-40 Min*$$</div>
                          <div className={style.itemDesc}>{product.itemDescription}</div>
                        </div>
                    ) ;
                })}
              </CardContent>
            </div>
            : ""}
    </React.Fragment>
  );
};