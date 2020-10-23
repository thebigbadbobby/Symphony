// ... Any imports you need, here are some examples:
import React from "react";
import { Button } from "@material-ui/core";
import gIcon from '../../assets/google-icon.svg'
import styles from './LogIn.styles'
// To import a function from a seperate file, you would do import { functionName1, functionName2 } from './../pathToFile'
export const LogIn = (props) => {
  const style = styles()
  // Simply checks if we are signed in and displays a sign in or sign out button.
  return (
    <React.Fragment>
        { !props.isSignedIn ? 
        <Button startIcon={<img src={gIcon} alt="Google"/>} className={style.signIn}variant="contained" size="large" onClick={props.handleSignIn}>Sign in with Google</Button> :
        <Button variant="contained" color="primary" size="small" onClick={props.handleSignOut}>Sign Out</Button> }
    </React.Fragment>
  );
};
