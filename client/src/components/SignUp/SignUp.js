import React, { useState } from "react";
import styles from "./SignUp.styles";
import {
  Container,
  Typography,
  TextField,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import MaskedInput from "react-text-mask";
import { axiosWrap } from "../../axios-wrapper";

/** A helper function for validating inputs from the user and erroring if necessary. */
const validateInput = (formState, errors) => {
  const returnedErrors = { ...errors };
  returnedErrors.phoneNumber = !/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(
    formState.phoneNumber
  );
  // check if any of them are empty, if they are, set to error state to true
  if (
    !formState.businessName ||
    !formState.storeAddress ||
    !formState.phoneNumber
  ) {
    returnedErrors.businessName = !formState.businessName;
    returnedErrors.storeAddress = !formState.storeAddress;
  } else {
    returnedErrors.businessName = formState.businessName.length <= 0;
    returnedErrors.storeAddress = formState.storeAddress.length <= 0;
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
  const [formState, setFormState] = useState({
    businessName: "",
    storeAddress: "",
    phoneNumber: "",
    pickupTime: "2pm",
    // deliveryDays: "MWF",
  });

  const [formErrors, setFormErrors] = useState({
    businessName: false,
    storeAddress: false,
    phoneNumber: false,
    pickupTime: false,
    // deliveryDays: false,
  });

  /** Courtesy of the material UI library */
  const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"#"}
        showMask
      />
    );
  };

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
  const handleSubmit = (payload) => {
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    // this simply checks if there are any errors that are true (in which case we don't want to submit)
    Object.keys(errorState).map(
      (key) => (hasErrors = hasErrors || errorState[key])
    );

    if (!hasErrors) {
      axiosWrap
        .post("/business/add-business", {
          businessName: formState.businessName,
          businessPhone: formState.phoneNumber,
          ownerFullName: user.fullName,
          ownerPhone: formState.phoneNumber,
          pickupAddress: formState.storeAddress,
          ownerEmail: user.email,
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
          We just need a little information from you about your business before
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
              <TextField
                className={style.field}
                id="businessName"
                label="Business Name"
                placeholder="e.g. Bill's Burgers"
                onChange={onChange}
                error={formErrors.businessName}
              />
              <TextField
                className={style.field}
                id="storeAddress"
                label="Store Address"
                placeholder="e.g. 1234 Sesame St. New York, New York, 12345"
                onChange={onChange}
                error={formErrors.storeAddress}
              />
              <Input
                className={style.field}
                name="textmask"
                id="phoneNumber"
                inputComponent={TextMaskCustom}
                onChange={onChange}
                error={formErrors.phoneNumber}
              />
              <Select
                labelId="demo-simple-select-label"
                id="pickupTime"
                label="Pickup Time"
                defaultValue={formState.pickupTime}
                onChange={(e) => handleDropdownChange(e, "pickupTime")}
              >
                <MenuItem value="2pm">2:00pm-5:00pm</MenuItem>
                {/* <MenuItem value="3pm">3:00pm</MenuItem>
                <MenuItem value="4pm">4:00pm</MenuItem> */}
              </Select>
              <FormHelperText className={style.field}>
                When should we allow drivers to pick up?
              </FormHelperText>
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
