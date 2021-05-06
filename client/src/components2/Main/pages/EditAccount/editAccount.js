import React, { useEffect, useState } from "react";
import styles from "./editAccount.styles";
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
  useRadioGroup,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { axiosWrap } from '../../../../axios-wrapper';
import { PhoneNumberMask } from "../../../Shared/PhoneNumberMask"
import { UserBindingContext } from "twilio/lib/rest/chat/v2/service/user/userBinding";


/** A helper function for validating inputs from the user and erroring if necessary. */
const validateInput = (formState, errors) => {
  const returnedErrors = { ...errors };
  if(returnedErrors.phoneNumber){
  returnedErrors.phoneNumber = !/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(
    formState.phoneNumber
  );
  }
  // check if any of them are empty, if they are, set to error state to true
  // if (
  //   !formState.phoneNumber
  // ) {
  //   returnedErrors.phoneNumber = !formState.phoneNumber;
  // } else {
  //   returnedErrors.phoneNumber = formState.phoneNumber.length <= 0;
  // }
  return returnedErrors;
};

/** Helper function to get the user's first name */
const getFirstName = (fullName) => {
  return fullName.split(" ")[0];
};

export const EditAccount = (props) => {
  const style = styles();
  // State variables
  const user = props.user;
  const [formState, setFormState] = useState({
    businessName: "",
    businessPhone: "",
    pickupAddress: "",
    locality: ""
  });
  const [timeDict] = useState({
    '2-5': [14,17]
  })

  const [getUser, setBusiness] = useState({
    business: props.business,
    businessName: "",
    businessPhone: "",
    pickupAddress: "",
    locality: "",
  });
  const [formErrors, setFormErrors] = useState({
    businessName: false,
    businessPhone: false,
    pickupAddress: false,
    locality: false
  });
  // const [getUser, setCustomer] = useState(undefined);
   //Called whenever there is an input change... updates the object holding the form state */
   const onChange = (e) => {
     e.preventDefault();
     const newState = formState;
     newState[e.target.id] = e.target.value;
     setFormState(newState);
   };

      useEffect( () => {
       const getUser= axiosWrap
     .get( "/business/"+props.business, {
     }).then((result) => {
     setBusiness(result.data)})
     },[])

  //  useEffect( () => {
  //   const getUser= axiosWrap
  // .get("/customer/:customerID", {
  // }).then((result) => {console.log(result)
  // setCustomer(result.data)})
  // },[])
  //console.log(getUser.fullName);
  /** Handles when one of the dropdowns changes (since annoyingly this has a different process than the inputs) */
  const handleDropdownChange = (e, id) => {
    e.preventDefault();
    const newState = formState;
    newState[id] = e.target.value;
    setFormState(newState);
  };

  /** Handles the submit button on the form. */
  const handleSubmit = (payload) => {//
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    // this simply checks if there are any errors that are true (in which case we don't want to submit)
    Object.keys(errorState).map(
      (key) => (hasErrors = hasErrors || errorState[key])
    );
    if (!hasErrors) {
      axiosWrap
        .patch("/business/update-business", {
          business: props.business,
          businessName: formState.businessName,
          businessPhone: formState.businessPhone,
          pickupAddress: formState.pickupAddress,
          locality: formState.locality
        })
        .then((res) => {
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
          hasErrors = true;
        });
    }
    if(!hasErrors){
        // alert the user that the account information has been saved
        window.alert("Your business account information has been saved.");
    }
    // set errors if any
    setFormErrors(errorState);
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" className={style.signUpContainer}>
        <Typography
          className={style.welcome}
          variant="h5"
          color="textPrimary"
          align="center"
        >
        </Typography>
        <Typography
          className={style.explanation}
          variant="subtitle1"
          color="textPrimary"
          align="center"
        >
         
        </Typography>
        <Card className={style.card}>
          <CardContent>
          Edit your business information
            <form
              id="sign-up-form"
              className={style.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormHelperText className={style.fieldHeader}>
              Business Name: {getUser.businessName}
              </FormHelperText>
              <Input
                className={style.field}
                id="businessName"
                label="Business Name"
                onChange={onChange}
                //inputComponent={fullName}
                placeholder={"e.g. Bill's Burgers"}
                //onChange={onChange}
                error={formErrors.businessName}
              />
               <FormHelperText className={style.fieldHeader}>
              Business Phone Number: {getUser.businessPhone}
              </FormHelperText>
              <Input
                className={style.field}
                name="textmask"
                id="businessPhone"
                label ="Business Phone"
                inputComponent={PhoneNumberMask}
                onChange={onChange}
                error={formErrors.phoneNumber}
              />
              <FormHelperText className={style.fieldHeader}>
              Store Address: {getUser.pickupAddress}
              </FormHelperText>
              <FormHelperText>
              
              </FormHelperText>
              {/*props.email*/}
              {/* {user.fullName} */}
              <Input
                className={style.field}
                id="pickupAddress"
                label="Pickup Address"
                onChange={onChange}
                placeholder={"e.g. 1234 Sesame St. New York, New York, 12345"}
                //onChange={onChange}
                error={formErrors.email}
              />
               <FormHelperText>
                Locality
              </FormHelperText>
              <Select
                labelId="demo-simple-select-label"
                id="locality"
                label="Locality"
                defaultValue={"santa cruz"}
                onChange={(e) => handleDropdownChange(e, "locality")}
              >
                <MenuItem value="auburn">Auburn</MenuItem>
                <MenuItem value="santa cruz">Santa Cruz</MenuItem>
              </Select>
              <Button
              className={style.save}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Update
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};
