import React, { useState } from "react";
import styles from "./SignUp.styles";
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
import { axiosWrap } from "../../axios-wrapper";
import { PhoneNumberMask } from "../Shared/PhoneNumberMask"

/** A helper function for validating inputs from the user and erroring if necessary. */
const validateInput = (formState, errors) => {
  const returnedErrors = { ...errors };
  returnedErrors.phoneNumber = !/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(
    formState.phoneNumber
  );
  // check if any of them are empty, if they are, set to error state to true
  if (
    // !formState.businessName ||
    // !formState.storeAddress ||
    // !formState.phoneNumber
    //!formState.fullName || This line was the issue because it's user.fullName
    !formState.phoneNumber
    //!formState.email
  ) {
    // returnedErrors.businessName = !formState.businessName;
    // returnedErrors.storeAddress = !formState.storeAddress;
    //returnedErrors.fullName = !formState.fullName;
    returnedErrors.phoneNumber = !formState.phoneNumber;
    //returnedErrors.email = !formState.email;
  } else {
    // returnedErrors.businessName = formState.businessName.length <= 0;
    // returnedErrors.storeAddress = formState.storeAddress.length <= 0;
    //returnedErrors.fullName = formState.fullName.length <= 0;
    returnedErrors.phoneNumber = formState.phoneNumber.length <= 0;
    //returnedErrors.email = formState.email.length <= 0;
  }

  return returnedErrors;
};

/** Helper function to get the user's first name */
const getFirstName = (fullName) => {
  return fullName.split(" ")[0];
};

/** The main sign up component, handles taking the users information in a form */
export const SignUp = (props) => {
  const style = styles();

  // State variables
  const user = props.user
  console.log(user)
  const [formState, setFormState] = useState({
    // businessName: "",
    // storeAddress: "",
    // phoneNumber: "",
    // pickupTime: "2-5",
    // locality: "santa cruz",
    // deliveryDays: "MWF",
    fullName: "",
    phoneNumber: "",
    email: "",

  });
  const [timeDict] = useState({
    '2-5': [14,17]
  })

  const [formErrors, setFormErrors] = useState({
    // businessName: false,
    // storeAddress: false,
    // phoneNumber: false,
    // pickupTime: false,
    // locality: false,
    // fullName: false,
    // phoneNumber: false,
    fullName: false,
    phoneNumber: false,
    email: false,
    // deliveryDays: false,
  });

  /** Called whenever there is an input change... updates the object holding the form state */
  const onChange = (e) => {
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };

  /** Handles when one of the dropdowns changes (since annoyingly this has a different process than the inputs) */
  const handleDropdownChange = (e, id) => {
    e.preventDefault();
    const newState = formState;
    newState[id] = e.target.value;
    setFormState(newState);
  };

  /** Handles the submit button on the form. */
  const handleSubmit = (payload) => {//
    console.log("ekans")
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    // this simply checks if there are any errors that are true (in which case we don't want to submit)
    Object.keys(errorState).map(
      (key) => (hasErrors = hasErrors || errorState[key])
    );
    console.log(formState.phoneNumber)
    console.log(errorState)
    if (!hasErrors) {
      axiosWrap
        .post("/customer/add-customer", {
          // businessName: formState.businessName,
          // businessPhone: formState.phoneNumber,
          // ownerFullName: user.fullName,
          // ownerPhone: formState.phoneNumber,
          // pickupAddress: formState.storeAddress,
          // pickupTimes24hr: timeDict[formState.pickupTime],
          // locality: formState.locality,
          // ownerEmail: user.email,
          fullName: user.fullName,
          phone: formState.phoneNumber,
          email: user.email,
        })
        .then((res) => {
          console.log("arbok")
          //props.businessCreated(res.data._id);
          props.customerCreated(res.data._ida);
        })
        .catch((err) => {
          console.log("Couldn't reach server!", err);
        });
    }
    // if there are errors, set them now.
    setFormErrors(errorState);
  };

  // Simply checks if we are signed in and displays a sign in or sign out button.
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={style.signUpContainer}>
        <Typography
          className={style.welcome}
          variant="h5"
          color="textPrimary"
          align="center"
        >
          Hi {getFirstName(user.fullName)}!
        </Typography>
        <Typography
          className={style.explanation}
          variant="subtitle1"
          color="textPrimary"
          align="center"
        >
          We just need a little information about you before
          we get started!
        </Typography>
        <Card className={style.card}>
          <CardContent>
            <form
              id="sign-up-form"
              className={style.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormHelperText className={style.fieldHeader}>
              Full Name
              </FormHelperText>
              <FormHelperText>
              What name would you like us to call you by?
              </FormHelperText>
              <Input
                className={style.field}
                id="businessName"
                label="Full Name"
                placeholder="e.g. John Doe"
                onChange={onChange}
                error={formErrors.businessName}
              />
              {/*<FormHelperText className={style.fieldHeader}>
              Store Address
              </FormHelperText>
              <Input
                className={style.field}
                id="storeAddress"
                label="Store Address"
                placeholder="e.g. 1234 Sesame St. New York, New York, 12345"
                onChange={onChange}
                error={formErrors.storeAddress}
              />
              <FormHelperText className={style.hint}>
              e.g. 1234 Sesame St. New York, New York, 12345
              </FormHelperText>*/}
              <FormHelperText className={style.fieldHeader}>
              Phone Number
              </FormHelperText>
              <Input
                className={style.field}
                name="textmask"
                id="phoneNumber"
                inputComponent={PhoneNumberMask}
                onChange={onChange}
                error={formErrors.phoneNumber}
              />
              {/*<FormHelperText className={style.fieldHeader}>
              Pickup Time
              </FormHelperText>
              <Select
                labelId="demo-simple-select-label"
                id="pickupTime"
                label="Pickup Time"
                defaultValue={formState.pickupTime}
                onChange={(e) => handleDropdownChange(e, "pickupTime")}
              >
                <MenuItem value="2-5">2:00pm-5:00pm</MenuItem>*/}
                {/* <MenuItem value="3pm">3:00pm</MenuItem>
                <MenuItem value="4pm">4:00pm</MenuItem>
              </Select>*/}
              {/*<FormHelperText>
                When should we allow drivers to pick up?
              </FormHelperText>*/}
              <FormHelperText className={style.fieldHeader}>
                Locality
              </FormHelperText>
              <Select
                labelId="demo-simple-select-label"
                id="locality"
                label="Locality"
                defaultValue={formState.locality}
                onChange={(e) => handleDropdownChange(e, "locality")}
              >
                <MenuItem value="auburn">Auburn</MenuItem>
                <MenuItem value="santa cruz">Santa Cruz</MenuItem>
              </Select>
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
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};
