// ... Any imports you need, here are some examples:
import React from "react";
import { Button } from "@material-ui/core";
import gIcon from '../../assets/google-icon.svg'
import styles from './LogIn.styles'
import {withStyles} from "@material-ui/core";
// To import a function from a seperate file, you would do import { functionName1, functionName2 } from './../pathToFile'
export const LogIn = (props) => {
  const style = styles()
  // Simply checks if we are signed in and displays a sign in or sign out button.
  const StyledButton = withStyles({
    root: {
        background: '#0DCDEC',
      "&.Mui-selected": {
        backgroundColor: "light-blue"
      }
    },
  })(Button);
  return (
    <React.Fragment>
        { !props.isSignedIn ? 
        <Button startIcon={<img src={gIcon} alt="Google"/>} className={style.signIn}variant="contained" size="large" onClick={props.handleSignIn}>Sign up with Google</Button> :
        <StyledButton variant="contained" color="primary" size="small" onClick={props.handleSignOut}>Sign Out</StyledButton> }
    </React.Fragment>
  );
};
