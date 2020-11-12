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
import { axiosWrap } from "../../axios-wrapper"


const validateInput = (formState, errors) => {
  const returnedErrors = { ...errors };
  returnedErrors.phoneNumber = /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/.test(formState.businessPhone);
  console.log("returned errors?", returnedErrors)
  // check if any of them are empty, if they are, set to error state to true
  if (!formState.businessName || !formState.storeAddress || !formState.businessPhone) {
    returnedErrors.businessName = !formState.businessName;
    returnedErrors.storeAddress = !formState.storeAddress;

  } else {
    returnedErrors.businessName = formState.businessName.length <= 0;
    returnedErrors.storeAddress = formState.storeAddress.length <= 0
  }
  return returnedErrors;
};

export const SignUp = (props) => {
  const style = styles();
  const user = props.user.getBasicProfile();
  console.log(user)

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

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

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
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  };

  const onChange = (e) => {
    e.preventDefault();
    const newState = formState;
    newState[e.target.id] = e.target.value;
    setFormState(newState);
  };

  const handleDropdownChange = (e, id) => {
    e.preventDefault();
    const newState = formState;
    newState[id] = e.target.value;
    setFormState(newState);
  };

  const handleSubmit = (payload) => {
    payload.preventDefault();
    const errorState = validateInput(formState, formErrors);
    let hasErrors = false;
    Object.keys(errorState).map(key => hasErrors = hasErrors || errorState[key])
    if (!hasErrors) {
      let formattedPhone = formState.phoneNumber.replace(/\(|[ ]/g, "")
      formattedPhone = formattedPhone.replace(/\)/, "-")
      console.log("formattedPhone", formattedPhone)
      axiosWrap.post('/business/add-business', {
        businessName: formState.businessName,
        businessPhone: formattedPhone,
        ownerFullName: user.Ad, 
        ownerPhone: formattedPhone,
        pickupAddress: formState.storeAddress,
        ownerEmail: user.$t,
      }).then(res => {
        console.log("made the business!", res)
      }).catch(err => {
        console.log("Couldn't reach server!", err)
      })
    }
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
          Hi {getFirstName(user.Ad)}!
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
                <MenuItem value="2pm">2:00pm</MenuItem>
                <MenuItem value="3pm">3:00pm</MenuItem>
                <MenuItem value="4pm">4:00pm</MenuItem>
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
